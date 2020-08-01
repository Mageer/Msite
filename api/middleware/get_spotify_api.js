const SpotifyWebApi = require('spotify-web-api-node');
const initSpotifyApi = require('../lib/init_spotify_api');

const getSpotify = ({ redirectUri }) => ((req, res, next) => {
    const spotifyApi = initSpotifyApi(redirectUri);

    // TODO: Change if we add other 3rd party support
    if (req.tokens) {
        spotifyApi.setAccessToken(req.tokens.spotify);
    }

    req.spotifyApi = spotifyApi;
    next();
});


module.exports = getSpotify;
