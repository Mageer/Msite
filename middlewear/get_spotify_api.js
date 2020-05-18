const SpotifyWebApi = require('spotify-web-api-node'); 

const getSpotify = ((req, res, next) => {
    const scopes = ['user-read-private', 'user-read-email'];
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    const redirectUri = 'http://localhost:3000/spotify/callback/';

    const spotifyApi = new SpotifyWebApi({
        clientId,
        clientSecret,
        redirectUri
    })

    if (req.header('Authorization')){
        const access_token = req.header('Authorization').replace('Bearer ', '')
        spotifyApi.setAccessToken(access_token);
    }
    
    req.spotifyApi = spotifyApi;
    req.scopes = scopes;
    next();
});


module.exports = getSpotify;
