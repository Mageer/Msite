const express = require('express');
const router = new express.Router();
const SpotifyWebApi = require('spotify-web-api-node');
const User = require('../models/user');
const setUserCookies = require('../lib/set_user_cookies');
const getSpotifyApi = require('../middleware/get_spotify_api');

router.use(getSpotifyApi({ redirectUri: 'http://localhost:4000/login/spotify-callback/' }));

router.post('/spotify', async (req, res) => {
    const spotifyApi = req.spotifyApi;
    try {
        const scopes = [
            "streaming", 
            "user-read-email", 
            "user-read-private", 
            "user-read-currently-playing"
        ];
    
        const spotifyLoginURL = spotifyApi.createAuthorizeURL(scopes);
        res.send({url: spotifyLoginURL+'&show_dialog=true'});
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});

const getSpotifyRefreshToken = async (spotifyApi, code) => {
    const authData = await spotifyApi.authorizationCodeGrant(code);
    const { access_token, refresh_token } = authData.body;
    spotifyApi.setAccessToken(access_token);
    return refresh_token;
}

const generateUsername = async (spotifyApi) => {
    const me = await spotifyApi.getMe();
    const userId = me.body.id;
    const username = `spotify_${userId}`;
    return username;
}

const getOrCreateUser = async (username, refresh_token) => {
    let user;
    try {
        user = await User.findUser(username);
    } catch (err) {
        user = new User({ username, password: '1234passworD!'});
    }
    user.spotify_refresh_token = refresh_token;
    await user.save();
    return user;
}

router.get('/spotify-callback', async (req, res) => {
    const spotifyApi = req.spotifyApi;
    const { code } = req.query;

    try {
        const spotify_refresh_token = await getSpotifyRefreshToken(spotifyApi, code)  
        const username = await generateUsername(spotifyApi);
        const user = await getOrCreateUser(username, spotify_refresh_token);

        await setUserCookies(user, res);
        const userAccessToken = await user.generateAccessToken();
        res.redirect(process.env.CLIENT_BASE_URI 
            + 'spotify-callback' 
            + '?' + 'username=' + encodeURI(user.username)
            + '&' + 'accessToken=' + encodeURI(userAccessToken));

    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});


module.exports = router;
