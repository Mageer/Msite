import { combineReducers } from 'redux';
import lyrics from './lyrics';
import user from './user';
import tracks from './tracks';
import playbackStatus from './playbackStatus';
import userPlaylists from './userPlaylists';

const rootReducer = combineReducers({
  user,
  userPlaylists,
  playbackStatus,
  lyrics,
  tracks,
});

export default rootReducer;
