const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');
const getUser = require('../middleware/get_user');
const getSpotifyApi = require('../middlewear/get_spotify_api');

const router = new express.Router();

router.post('/register', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.generateRefreshToken();
        await user.save(); // Not actually necessary, avoids future problems
        const access_token = user.generateJWT(null);
        res.send({ access_token });

    } catch(err) {
        res.status(400).send(err.message);
    }
});

// Wrap in try-catch as refreshAcessToken may fail.
const getNewSpotifyAccessToken = async (user, spotifyApi) => {
    const refresh_token = user.spotify_refresh_token;
    spotifyApi.setRefreshToken(refresh_token);

    const authData = await spotifyApi.refreshAccessToken();
    const access_token = authData.body.access_token;
    return access_token;
}

router.post('/login', getSpotifyApi, async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.username, req.body.password);
        user.generateRefreshToken();

        const spotifyApi = req.getSpotifyApi;
        const spotify_access_token = getNewSpotifyAccessToken(user, spotifyApi);

        const access_token = user.generateJWT({ spotify: spotify_access_token });
        res.send({ access_token });

    } catch(err) {
        res.status(400).send(err.message);
    }
});

router.post('/logout', auth, getUser, async (req, res) => {
    const user = req.user;
    user.refresh_token = null;
    try {
        await user.save();  
        res.send()
    
    } catch (err) {
        res.status(400).send(err.message);
    }
});


router.post('/new-access-token', auth, getUser, getSpotifyApi, async (req, res) => {
    const user = req.user;
    const spotifyApi = req.SpotifyApi;

    try {
        const spotify_acess_token = getNewSpotifyAccessToken(user, spotifyApi);
        const access_token = user.generateJWT({ spotify: spotify_access_token });
        res.send({ access_token });

    } catch(err) {
        res.status(400).send(err.message);
    }

});



router.get('/me', auth, getUser, (req, res) => {
    res.send(req.user);
});


module.exports = router;
