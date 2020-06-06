const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');
const getUser = require('../middleware/get_user');

const router = new express.Router();

router.post('/register', async (req, res) => {
    const user = new User(req.body);
    try {
        const refresh_token = await user.generateRefreshToken();
        const access_token = await user.generateAccessToken();
        res.send({ access_token, refresh_token });

    } catch(err) {
        res.status(400).send(err.message);
    }
});


router.post('/login', async (req, res) => {
    try {
        const user = await User.findByUsernameAndPassword(req.body.username, req.body.password);
        const refresh_token = await user.generateRefreshToken();
        const access_token = await user.generateAccessToken();
        res.send({ access_token, refresh_token});

    } catch(err) {
        res.status(400).send(err.message);
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
 * Requires username in body and refresh token in header
 */
router.post('/new-access-token', async (req, res) => {
    try {
        const refresh_token = req.header('Authorization').replace('Bearer ', '');
        const user = await User.findByUsernameAndRefreshToken(req.body.username, refresh_token);
        const access_token = await user.generateAccessToken();
        res.send({ access_token });

    } catch(err) {
        res.status(400).send(err.message);
    }
});


router.get('/me', auth, getUser, (req, res) => {
    res.send(req.user);
});



module.exports = router;
