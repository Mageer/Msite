const express = require("express");
const router = new express.Router();
const getSpotifyApi = require("../middleware/get_spotify_api");
const loginWithSpotifyController = require("../controllers/loginWithSpotifyController");

const redirectUri = `${process.env.CLIENT_BASE_URL}/login-with-spotify/callback/`;
router.use(getSpotifyApi({ redirectUri }));

router.post("/login", loginWithSpotifyController.login);
router.post("/callback", loginWithSpotifyController.callback);

module.exports = router;
