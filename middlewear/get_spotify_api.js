const SpotifyWebApi = require('spotify-web-api-node'); 

const getSpotify = ((req, res, next) => {
    const scopes = ['user-read-private', 'user-read-email'];
    const clientId = 'b08ff07ddc44452fa76ea628909a4334';
    const clientSecret = 'e70ec1061fb446d6bac12f1e738ba9b9';
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
