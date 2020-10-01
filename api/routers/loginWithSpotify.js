const express = require("express");
const router = new express.Router();
const getSpotifyApi = require("../middleware/get_spotify_api");
const loginWithSpotifyController = require("../controllers/loginWithSpotifyCotroller");

const redirectUri = `${process.env.SERVER_BASE_URL}/login/spotify-callback/`;
router.use(getSpotifyApi({ redirectUri }));

router.post("/spotify", loginWithSpotifyController.login);
router.get("/spotify-callback", loginWithSpotifyController.callback);

module.exports = router;
