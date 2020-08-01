const SpotifyWebApi = require('spotify-web-api-node');

const initSpotifyApi = (redirectUri) => {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

    const spotifyApi = new SpotifyWebApi({
        clientId,
        clientSecret,
        redirectUri
    });

    return spotifyApi;
}


module.exports = initSpotifyApi;