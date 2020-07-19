import { combineReducers } from 'redux';
import lyrics from './lyrics';
import loginUser from './loginUser';
import currentPlayingTrack from './currentPlayingTrack';

const rootReducer = combineReducers({
  loginUser,
  currentPlayingTrack,
  lyrics,
});

export default rootReducer;
