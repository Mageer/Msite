import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { playbackStatusUpdate } from "../../actions/playbackStatus";
import { transferPlaybackOnDeviceLoad } from "../../actions/devices";
import { setCurrentLyricsId } from "../../actions/lyrics";
import { refreshUser } from "../../actions/user";
import trackToLyricsId from "../../lib/trackToLyricsId";
import useScript from "react-script-hook";
import jwt from "jsonwebtoken";

const extractSpotifyAccessToken = (jwtToken) => {
  const decodedJwt = jwt.decode(jwtToken);
  const spotifyAccessToken = decodedJwt.tokens.spotify;
  return spotifyAccessToken;
};

function initPlayer(dispatch) {
  const player = new window.Spotify.Player({
    name: "M-site",
    getOAuthToken: (callback) => {
      const refreshCallback = (jwtToken) => {
        const token = extractSpotifyAccessToken(jwtToken);
        callback(token);
      };
      dispatch(refreshUser((token) => refreshCallback(token)));
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
  player.on("initialization_error", ({ message }) => {
    console.error("Failed to initialize", message);
  });
  player.on("authentication_error", ({ message }) => {
    console.error("Failed to authenticate", message);
  });
  player.on("account_error", ({ message }) => {
    console.error("Failed to validate Spotify account", message);
  });
  player.connect();
  return player;
}

function useSpotifyPlayer() {
  const dispatch = useDispatch();
  const [player, setPlayer] = useState(null);

  const [loading] = useScript({
    src: "https://sdk.scdn.co/spotify-player.js",
    checkForExisting: true,
  });
  window.onSpotifyWebPlaybackSDKReady = () => {};

  useEffect(() => {
    if (!loading) {
      setPlayer(initPlayer(dispatch));
    }
  }, [loading, dispatch]);

  return player;
}

export default useSpotifyPlayer;
