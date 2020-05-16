const express = require('express');
const router = express.Router();
const Duration = require('../lib/duration');
const SpotifyWebApi = require('spotify-web-api-node');
const getSpotifyApi = require('../middlewear/get_spotify_api');


router.get('/login', getSpotifyApi, (req, res) => {
  const spotifyApi = req.spotifyApi
  const spotifyLoginURL = spotifyApi.createAuthorizeURL(req.scopes);
  res.redirect(spotifyLoginURL); 
});


router.get('/callback', getSpotifyApi, async (req, res) => {
  const spotifyApi = req.spotifyApi;
  const { code } = req.query;

  try {
    const authData = await spotifyApi.authorizationCodeGrant(code);
    const tokens = authData.body;
    const { access_token, refresh_token } = tokens
    res.send({ access_token, refresh_token });

  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  };
});


router.get('/me', getSpotifyApi, async (req, res) => {
  const spotifyApi = req.spotifyApi;
  try {
    const me = await spotifyApi.getMe();
    res.send(me.body);
  } catch (err) {
    console.log(err.message);
    res.status(400).send(err);
  }
});


router.get('/track', getSpotifyApi, async (req,res) => {
  const spotifyApi = req.spotifyApi;
    try {
      const tracks = await spotifyApi.searchTracks(req.query.name, {limit:1});
      const track = tracks.body.tracks.items[0];

      if (!track){
        console.log('No such song');
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
