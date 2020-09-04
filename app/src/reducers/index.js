import { combineReducers } from 'redux';
import lyrics from './lyrics';
import user from './user';
import searchTracks from './searchTracks';
import playbackStatus from './playbackStatus';

const rootReducer = combineReducers({
  user,
  playbackStatus,
  lyrics,
  searchTracks,
});

export default rootReducer;
