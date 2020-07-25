import { useDispatch } from 'react-redux';
import { playbackStatusUpdate, transferPlayback } from '../../actions/playbackStatus';

function useSpotifyPlayer (token) {
  const dispatch = useDispatch();

  const player = new window.Spotify.Player({
    name: 'M-site',
    getOAuthToken: (cb) => { cb(token); },
  });

  player.on('ready', data => {
    console.log('Ready with Device ID: ', data.device_id);
    dispatch(transferPlayback(data.device_id));
  });
      
  player.addListener('player_state_changed', ({
      paused,
      position,
      duration,
      track_window: { current_track }
    }) => dispatch(playbackStatusUpdate(current_track, duration, position, paused))
  );

  player.connect();
    
  return player;
}

export default useSpotifyPlayer;
