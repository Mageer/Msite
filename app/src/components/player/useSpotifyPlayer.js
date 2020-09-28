import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { playbackStatusUpdate } from "../../actions/playbackStatus";
import { transferPlaybackOnDeviceLoad } from "../../actions/devices";
import { setCurrentLyricsId } from "../../actions/lyrics";
import trackToLyricsId from "../../lib/trackToLyricsId";
import useScript from "react-script-hook";
import jwt from "jsonwebtoken";

const getSpotifyAccessToken = (jwtToken) => {
  const decodedJwt = jwt.decode(jwtToken);
  const spotifyAccessToken = decodedJwt.tokens.spotify;
  return spotifyAccessToken;
};

function initSpotify(token, dispatch) {
  const player = new window.Spotify.Player({
    name: "M-site",
    getOAuthToken: (cb) => {
      cb(token);
    },
  });
  player.on("ready", async (data) => {
    dispatch(transferPlaybackOnDeviceLoad(data.device_id));
  });
  player.addListener("player_state_changed", (state) => {
    if (state) {
      const {
        paused,
        position,
        duration,
        track_window: { current_track },
      } = state;
      const lyricsId = trackToLyricsId(current_track);
      dispatch(setCurrentLyricsId(lyricsId));
      dispatch(playbackStatusUpdate(current_track, duration, position, paused));
    }
  });
  player.connect();
  return player;
}

function useSpotifyPlayer() {
  const dispatch = useDispatch();
  const jwtToken = useSelector((state) => state.user.accessToken);
  const [loaded, setLoaded] = useState(false);
  const [player, setPlayer] = useState(null);

  useScript({
    src: "https://sdk.scdn.co/spotify-player.js",
    checkForExisting: true,
  });
  window.onSpotifyWebPlaybackSDKReady = () => setLoaded(true);

  useEffect(() => {
    if (loaded && jwtToken) {
      setPlayer(initSpotify(getSpotifyAccessToken(jwtToken), dispatch));
    }
  }, [loaded, jwtToken, dispatch]);

  return player;
}

export default useSpotifyPlayer;
