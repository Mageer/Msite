const SpotifyWebApi = require('spotify-web-api-node'); 

const getSpotify = ((req, res, next) => {
    const scopes = ["streaming", "user-read-email", "user-read-private"];
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    const redirectUri = 'http://localhost:4000/spotify/callback/';

    const spotifyApi = new SpotifyWebApi({
        clientId,
        clientSecret,
        redirectUri
    });

    // TODO: Change if we add Apple support
    if (req.tokens) {
        spotifyApi.setAccessToken(req.tokens.spotify);
    }
    
    req.spotifyApi = spotifyApi;
    req.scopes = scopes;
    next();
});


module.exports = getSpotify;
