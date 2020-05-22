const express = require('express');
const router = new express.Router();
const Duration = require('../lib/duration');
const SpotifyWebApi = require('spotify-web-api-node');
const User = require('../models/user');
const getSpotifyApi = require('../middleware/get_spotify_api');
const auth = require('../middleware/auth');
const getUser = require('../middleware/get_user');

// Very important that auth comes before getSpotifyApi.
router.use(auth);
router.use(getSpotifyApi);

/** TODO: All authentication related should be changed
 *  to POST instead of GET. Currently GET due to easier 
 *  debugging in browser. 
 *  (Postman is more complicated with Oauth2.0) 
 */

router.get('/login', (req, res) => {
    const spotifyApi = req.spotifyApi;
    const spotifyLoginURL = spotifyApi.createAuthorizeURL(req.scopes, req.jwt_token);
    res.redirect(spotifyLoginURL); 
});


router.get('/callback', getUser, async (req, res) => {
    const user = req.user;
    const spotifyApi = req.spotifyApi;
    const { code } = req.query;

    try {
        const authData = await spotifyApi.authorizationCodeGrant(code);
        const { access_token, refresh_token } = authData.body;

        user.spotify_refresh_token = refresh_token;
        await user.save();

        const jwt_token = await user.generateJWT({ spotify: access_token });
        res.send({ token: jwt_token });

    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
});


router.get('/refresh-access-token', getUser, async (req, res) => {
    const user = req.user;
    const refresh_token = user.spotify_refresh_token;

    const spotifyApi = req.spotifyApi;
    spotifyApi.setRefreshToken(refresh_token);

    try {
        const authData = await spotifyApi.refreshAccessToken();
        const access_token = authData.body.access_token;
        const jwt_token = await user.generateJWT({ spotify: access_token});
        res.send({ token: jwt_token });

    } catch(err) {
        res.status(400).send(err);
    }
});


router.get('/me', async (req, res) => {
    const spotifyApi = req.spotifyApi;
    try {
        const me = await spotifyApi.getMe();
        res.send(me.body);
    } catch (err) {
        console.log(err.message);
        res.status(400).send(err);
    }
});


router.get('/track', async (req,res) => {
    const spotifyApi = req.spotifyApi;
    try {
        const tracks = await spotifyApi.searchTracks(req.query.name, {limit:1});
        const track = tracks.body.tracks.items[0];

        if (!track){
            return res.status(404).send('No such song');
        }

        res.status(200).send({
            artist: track.artists[0].name,
            song_name: track.name,
            duration: Duration(track.duration_ms).msg,
        });

    } catch (err) {
        console.log(err);
        res.status(400).send(err.message);
    } 
});


module.exports = router;
