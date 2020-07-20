import { combineReducers } from 'redux';
import lyrics from './lyrics';
import loginUser from './loginUser';
import currentPlayingTrack from './currentPlayingTrack';
import searchTracks from './searchTracks';

const rootReducer = combineReducers({
  loginUser,
  currentPlayingTrack,
  lyrics,
  searchTracks,
});

export default rootReducer;
