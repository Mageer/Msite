const SpotifyWebApi = require("spotify-web-api-node");
const User = require("../models/user");
const userCookies = require("../lib/user-cookies");

/**
 *
 *  CONTROLLER NEEDS SERIOUS REFACTOR
 *  Several methods should be in the model
 *
 */

exports.login = async (req, res) => {
  const spotifyApi = req.spotifyApi;
  try {
    const scopes = [
      "streaming",
      "user-read-email",
      "user-library-read",
      "user-read-private",
      "user-read-currently-playing",
      "user-read-playback-state",
    ];

    const spotifyLoginURL = spotifyApi.createAuthorizeURL(scopes);
    res.send({ url: spotifyLoginURL + "&show_dialog=true" });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

const getSpotifyRefreshToken = async (spotifyApi, code) => {
  const authData = await spotifyApi.authorizationCodeGrant(code);
  const { access_token, refresh_token } = authData.body;
  spotifyApi.setAccessToken(access_token);
  return refresh_token;
};

const generateUsername = async (spotifyApi) => {
  const me = await spotifyApi.getMe();
  const userId = me.body.id;
  const username = `spotify_${userId}`;
  return username;
};

const getOrCreateUser = async (username, refresh_token) => {
  let user;
  try {
    user = await User.findUser(username);
  } catch (err) {
    user = new User({ username, password: "1234passworD!" });
  }
  user.spotify_refresh_token = refresh_token;
  await user.save();
  return user;
};

exports.callback = async (req, res) => {
  const spotifyApi = req.spotifyApi;
  const { code } = req.query;

  try {
    const spotify_refresh_token = await getSpotifyRefreshToken(
      spotifyApi,
      code
    );
    const username = await generateUsername(spotifyApi);
    const user = await getOrCreateUser(username, spotify_refresh_token);
    await userCookies.set(user, res);
    res.send({});
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};
