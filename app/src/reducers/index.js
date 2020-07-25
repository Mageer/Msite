import { combineReducers } from 'redux';
import lyrics from './lyrics';
import user from './user';
import currentPlayingTrack from './currentPlayingTrack';
import searchTracks from './searchTracks';
import playbackStatus from './playbackStatus';

const rootReducer = combineReducers({
  user,
  playbackStatus,
  currentPlayingTrack,
  lyrics,
  searchTracks,
});

export default rootReducer;
