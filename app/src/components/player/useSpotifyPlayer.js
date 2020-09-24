import { useState } from "react";
import { useDispatch } from "react-redux";
import { playbackStatusUpdate } from "../../actions/playbackStatus";
import { transferPlaybackOnDeviceLoad } from "../../actions/devices";
import { setCurrentLyricsId } from "../../actions/lyrics";
import trackToLyricsId from "../../lib/trackToLyricsId";
import useScript from "react-script-hook";

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

function useSpotifyPlayer(token) {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  let player = null;

  useScript({
    src: "https://sdk.scdn.co/spotify-player.js",
    checkForExisting: true,
  });
  window.onSpotifyWebPlaybackSDKReady = () => setLoaded(true);

  if (loaded) {
    player = initSpotify(token, dispatch);
  }
  return player;
}

export default useSpotifyPlayer;
