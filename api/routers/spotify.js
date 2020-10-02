const express = require("express");
const router = new express.Router();
const getSpotifyApi = require("../middleware/get_spotify_api");
const auth = require("../middleware/auth");
const getUser = require("../middleware/get_user");
const spotifyController = require("../controllers/spotifyController");

// Very important that auth comes before getSpotifyApi.
router.use(auth);
router.use(
  getSpotifyApi({
    redirectUri: `${process.env.CLIENT_BASE_URL}/login-with-spotify/callback/`,
  })
);

/** TODO: All authentication related should be changed
 *  to POST instead of GET. Currently GET due to easier
 *  debugging in browser.
 *  (Postman is more complicated with Oauth2.0)
 */

router.get("/login", spotifyController.login);
router.get("/callback", getUser, spotifyController.callback);
router.put("/transfer-playback", spotifyController.transferPlayback);
router.get("/current-playing-track", spotifyController.currentPlayingTrack);
router.post("/play-track", spotifyController.playTrack);
router.post("/play-playlist", spotifyController.playPlaylist);
router.get("/tracks", spotifyController.tracks);
router.get("/playlistTracks", spotifyController.playlistTracks);
router.get("/user-saved-tracks", spotifyController.userSavedTracks);
router.get("/user-playlists", spotifyController.userPlaylists);
router.get("/devices", spotifyController.devices);
router.get("/me", spotifyController.me);

module.exports = router;
