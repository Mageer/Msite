const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');
const getUser = require('../middleware/get_user');

const router = new express.Router();

const setUserCookies = async (user, res) => {
    const refresh_token = await user.generateRefreshToken();
    const username = user.username;
    const path = '/user/new-access-token';
    res.cookie('username', username, { path, httpOnly: true })
    res.cookie('refresh_token', refresh_token, { path, httpOnly: true });
} 

router.post('/register', async (req, res) => {
    try {
        const user = new User(req.body);
        await setUserCookies(user, res);
        const access_token = await user.generateAccessToken();
        res.send({ access_token });

    } catch(err) {
        res.status(400).send(err.message);
    }
});


router.post('/login', async (req, res) => {
    try {
        const user = await User.findByUsernameAndPassword(req.body.username, req.body.password);
        await setUserCookies(user, res);
        const accessToken = await user.generateAccessToken();
        res.send({ accessToken });

    } catch(err) {
        res.status(400).send({error: err.message});
    }
});


router.post('/logout', auth, getUser, async (req, res) => {
    const user = req.user;

    try {
        user.refresh_token = undefined;
        await user.save();  
        res.send()
    
    } catch (err) {
        res.status(400).send(err.message);
    }
});


/**
 * Username and refresh token in cookie
 */
router.post('/new-access-token', async (req, res) => {
    try {
        const refresh_token = req.cookies.refresh_token;
        const username = req.cookies.username;

        const user = await User.findByUsernameAndRefreshToken(username, refresh_token);

        const access_token = await user.generateAccessToken();
        res.send({ username, access_token });

    } catch(err) {
        res.status(400).send(err.message);
    }
});


router.get('/me', auth, getUser, (req, res) => {
    res.send(req.user);
});



module.exports = router;
