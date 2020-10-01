const SpotifyWebApi = require("spotify-web-api-node");
const User = require("../models/user");

const tracksInfo = (tracks) =>
  tracks.map((track) => {
    const albumArtUrl = track.album.images.length
      ? track.album.images[2].url
      : undefined;
    return {
      artists: track.artists.map((artist) => artist.name),
      name: track.name,
      id: track.id,
      duration: track.duration_ms,
      albumArtUrl,
    };
  });

exports.login = (req, res) => {
  const spotifyApi = req.spotifyApi;
  /** For more on scopes, please read the Spotify API docs:
   * https://developer.spotify.com/documentation/general/guides/scopes/
   */
  const scopes = [
    "streaming",
    "user-read-email",
    "user-read-private",
    "user-read-currently-playing",
  ];

  const spotifyLoginURL = spotifyApi.createAuthorizeURL(scopes, req.jwt_token);
  res.send({ url: spotifyLoginURL + "&show_dialog=true" });
};

exports.callback = async (req, res) => {
  const user = req.user;
  const spotifyApi = req.spotifyApi;
  const { code } = req.query;

  try {
    const authData = await spotifyApi.authorizationCodeGrant(code);
    const { access_token, refresh_token } = authData.body;

    user.spotify_refresh_token = refresh_token;
    await user.save();

    const user_access_token = await user.generateAccessToken();

    res.redirect(
      `${process.env.CLIENT_BASE_URL}/spotify-callback?username=${user.username}&access_token=${user_access_token}&spotify_access_token=${access_token}`
    );
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

exports.transferPlayback = async (req, res) => {
  const spotifyApi = req.spotifyApi;
  try {
    const device_id = req.query.device_id;
    const play = req.query.play || false;
    await spotifyApi.transferMyPlayback({ deviceIds: [device_id], play });
    res.send({});
  } catch (err) {
    res.status(400).send({ error: err.msg });
  }
};

exports.currentPlayingTrack = async (req, res) => {
  const spotifyApi = req.spotifyApi;

  try {
    const { body: trackDataBody } = await spotifyApi.getMyCurrentPlayingTrack();
    const trackData = trackDataBody.item;
    if (!trackData) {
      return res.status(400).send("No track playing");
    }

    const trackName = trackData.name;
    const artistsData = trackData.artists;
    const artists = artistsData.map((artist) => artist.name);
    res.send({ trackName, artists });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

exports.playTrack = async (req, res) => {
  const spotifyApi = req.spotifyApi;
  const trackUri = req.query.uri;
  try {
    spotifyApi.play({ uris: [`spotify:track:${trackUri}`] });
    res.send({});
  } catch (err) {
    res.status(400).send({ error: err.msg });
  }
};

exports.playPlaylist = async (req, res) => {
  const spotifyApi = req.spotifyApi;
  const { uri, offset } = req.query;
  try {
    spotifyApi.play({
      context_uri: `spotify:playlist:${uri}`,
      offset: { position: offset },
    });
    res.send({});
  } catch (err) {
    res.status(400).send({ error: err.msg });
  }
};

exports.tracks = async (req, res) => {
  const spotifyApi = req.spotifyApi;
  const { search, limit, offset } = req.query;
  try {
    const { body: searchResults } = await spotifyApi.searchTracks(search, {
      limit: limit || 50,
      offset,
    });
    const tracks = searchResults.tracks.items;
    res.status(200).send(tracksInfo(tracks));
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: err.message });
  }
};

exports.playlistTracks = async (req, res) => {
  const spotifyApi = req.spotifyApi;
  const { id, limit, offset } = req.query;
  try {
    const { body: playlistTracks } = await spotifyApi.getPlaylistTracks(id, {
      limit: limit || 50,
      offset,
    });
    const tracks = playlistTracks.items.map((track) => track.track);
    res.send(tracksInfo(tracks));
  } catch (err) {
    res.status(400).send({ error: err.msg });
  }
};

exports.userSavedTracks = async (req, res) => {
  const spotifyApi = req.spotifyApi;
  const { limit, offset } = req.query;
  try {
    const { body: savedTracks } = await spotifyApi.getMySavedTracks({
      limit,
      offset,
    });
    const tracks = savedTracks.items.map((track) => track.track);
    res.send(tracksInfo(tracks));
  } catch (err) {
    res.status(400).send({ error: err.msg });
  }
};

exports.userPlaylists = async (req, res) => {
  const spotifyApi = req.spotifyApi;
  try {
    const { body } = await spotifyApi.getUserPlaylists();
    const playlists = body.items.map((playlist) => ({
      id: playlist.id,
      imageUrl: playlist.images[0].url,
      name: playlist.name,
    }));
    res.send(playlists);
  } catch (err) {
    res.status(400).send({ error: err.msg });
  }
};

exports.devices = async (req, res) => {
  const spotifyApi = req.spotifyApi;
  try {
    const response = await spotifyApi.getMyDevices();
    const devices = response.body.devices;
    res.send(devices);
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: err });
  }
};

exports.me = async (req, res) => {
  const spotifyApi = req.spotifyApi;
  try {
    const me = await spotifyApi.getMe();
    res.send(me.body);
  } catch (err) {
    console.log(err.message);
    res.status(400).send(err);
  }
};
