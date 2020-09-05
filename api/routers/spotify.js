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
router.use(getSpotifyApi({ redirectUri: 'http://localhost:4000/spotify/callback/' }));

/** TODO: All authentication related should be changed
 *  to POST instead of GET. Currently GET due to easier 
 *  debugging in browser. 
 *  (Postman is more complicated with Oauth2.0) 
 */

router.get('/login', (req, res) => {
    const spotifyApi = req.spotifyApi;
    /** For more on scopes, please read the Spotify API docs:
     * https://developer.spotify.com/documentation/general/guides/scopes/
     */
    const scopes = [
        "streaming", 
        "user-read-email", 
        "user-read-private", 
        "user-read-currently-playing"
    ];

    const spotifyLoginURL = spotifyApi.createAuthorizeURL(scopes, req.jwt_token);
    res.send({url: spotifyLoginURL+'&show_dialog=true'});
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

        const user_access_token = await user.generateAccessToken();

        res.redirect(process.env.CLIENT_BASE_URI 
            + 'spotify-callback' 
            + '?' + 'username=' + user.username
            + '&' + 'access_token=' + user_access_token
            + '&' + 'spotify_access_token=' + access_token);

    } catch (err) {
        console.log(err);
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


router.get('/current-playing-track', async (req, res) => {
    const spotifyApi = req.spotifyApi;

    try {
        const {body: trackDataBody} = await spotifyApi.getMyCurrentPlayingTrack();
        const trackData = trackDataBody.item;
        if ( !trackData ) {
            return res.status(400).send("No track playing");
        }

        const trackName = trackData.name;
        const artistsData = trackData.artists;
        const artists = artistsData.map(artist => artist.name);
        res.send({trackName, artists});

    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
});

const tracksInfo = (tracks) => tracks.map((track) => ({
    artists: track.artists.map((artist) => artist.name),
    name: track.name,
    id: track.id,
    duration: track.duration_ms,
    albumArtUrl: track.album.images[2].url,
}));

router.get('/tracks', async (req, res) => {
    const spotifyApi = req.spotifyApi;
    const { search, limit, offset } = req.query;
    console.log(search, limit, offset)
    try {
        const { body: searchResults } = await spotifyApi.searchTracks(search, {limit, offset});
        const tracks = searchResults.tracks.items;
        res.status(200).send(tracksInfo(tracks));

    } catch (err) {
        console.log(err);
        res.status(400).send({ error: err.message });
    } 
});


router.get('/user-playlists', async (req, res) => {
    const spotifyApi = req.spotifyApi;
    try {
        const { body } = await spotifyApi.getUserPlaylists();
        const playlists = body.items;
        res.send(playlists);
    } catch (err) {
        res.status(400).send({ error: err.msg});
    }
});

router.get('/user-saved-tracks', async (req, res) => {
    const spotifyApi = req.spotifyApi;
    const { limit, offset } = req.query;
    try {
        const { body: savedTracks } = await spotifyApi.getMySavedTracks({ limit, offset });
        const tracks = savedTracks.items.map((track) => track.track);
        res.send(tracksInfo(tracks));
    } catch (err) {
        res.status(400).send({ error: err.msg});
    }
});


router.post('/play-track', async (req, res) => {
    const spotifyApi = req.spotifyApi;
    try {
        const trackURI = req.query.uri;
        spotifyApi.play({uris: [`spotify:track:${trackURI}`]})
        res.send({});
    } catch(err) {
        res.status(400).send({ error: err.msg})
    }
})

router.put('/transfer-playback', async (req, res) => {
    const spotifyApi = req.spotifyApi;
    try {
        const device_id = req.query.device_id;
        const play = req.query.play || false;
        spotifyApi.transferMyPlayback({ deviceIds:[ device_id ], play });
        res.send({});
    } catch(err) {
        res.status(400).send({ error: err.msg });
    }
})


module.exports = router;
