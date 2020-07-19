import {
  CURRENT_PLAYING_TRACK_REQUEST,
  CURRENT_PLAYING_TRACK_SUCCESS,
  CURRENT_PLAYING_TRACK_FAILURE,
} from '../actions/currentPlayingTrack';

const initialTrack = {
  trackName: '',
  isFetching: false,
};

function currentPlayingTrack(state = initialTrack, action) {
  switch (action.type) {
    case CURRENT_PLAYING_TRACK_REQUEST:
      return {
        ...state,
        trackName: 'poopy',
        isFetching: true,
      };
    case CURRENT_PLAYING_TRACK_SUCCESS:
      return {
        ...state,
        trackName: action.trackName,
        isFetching: false,
      };
    case CURRENT_PLAYING_TRACK_FAILURE:
      return {
        ...state,
        trackName: '',
        isFetching: false,
      };
    default:
      return state;
  }
}

export default currentPlayingTrack;
