import {
    PLAYBACK_STATUS_UPDATE, 
    TRANSFER_PLAYBACK_REQUEST,
    TRANSFER_PLAYBACK_SUCCESS,
    TRANSFER_PLAYBACK_FAILURE,
} from '../actions/playbackStatus';
  
const initialPlaybackStatus = {
  currentTrack: null,
  duration: 0,
  position: 0,
  paused: true,
  deviceId: null,
  error: null,
};
  
function playbackStatus(state = initialPlaybackStatus, action) {
  switch (action.type) {
    case PLAYBACK_STATUS_UPDATE:
      return {
        ...state,
        currentTrack: action.currentTrack,
        duration: action.duration,
        position: action.position,
        paused: action.paused,
        error: null,
      };
    case TRANSFER_PLAYBACK_REQUEST:
      return {
        ...state,
        deviceId: action.deviceId,
        error: null,
      };
    case TRANSFER_PLAYBACK_SUCCESS:
      return {
        ...state,
        deviceId: action.deviceId,
        error: null,
      };
    case TRANSFER_PLAYBACK_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
}
  
  export default playbackStatus;
  