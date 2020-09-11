import { combineReducers } from 'redux';
import lyrics from './lyrics';
import user from './user';
import searchTracks from './searchTracks';
import playbackStatus from './playbackStatus';
import userPlaylists from './userPlaylists';

const rootReducer = combineReducers({
  user,
  userPlaylists,
  playbackStatus,
  lyrics,
  searchTracks,
});

export default rootReducer;
