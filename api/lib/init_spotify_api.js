const SpotifyWebApi = require('spotify-web-api-node');

const initSpotifyApi = () => {
    const scopes = ["streaming", "user-read-email", "user-read-private"];
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    const redirectUri = 'http://localhost:4000/spotify/callback/';

    const spotifyApi = new SpotifyWebApi({
        clientId,
        clientSecret,
        redirectUri
    });

    return spotifyApi;
}


module.exports = initSpotifyApi;