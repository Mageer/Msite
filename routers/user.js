const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');
const getUser = require('../middleware/get_user');

const router = new express.Router();

router.post('/register', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        const token = user.generateJWT(null);
        res.send({ token });

    } catch(err) {
        res.status(400).send(err.message);
    }
});

router.post('/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.username, req.body.password);
        const token = user.generateJWT(null);
        res.send({ token });
    } catch(err) {
        res.status(400).send(err.message);
    }
});


router.get('/new-token', auth, getUser, async(req, res) => {
    const user = req.user;
    const jwt_token = await user.generateJWT(req.tokens);
    res.send({ token: jwt_token });
});


router.get('/me', auth, getUser, (req, res) => {
    res.send(req.user);
});


module.exports = router;
