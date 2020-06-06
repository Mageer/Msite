const SpotifyWebApi = require('spotify-web-api-node');
const initSpotifyApi = require('./init_spotify_api');

const spotifyAccessToken = async (user) => {
    const spotifyApi = initSpotifyApi();
    const refresh_token = user.spotify_refresh_token;
    spotifyApi.setRefreshToken(refresh_token);

    const authData = await spotifyApi.refreshAccessToken();
    const access_token = authData.body.access_token;
    return access_token;
}


module.exports.spotifyAccessToken = spotifyAccessToken;