import { combineReducers } from 'redux';
import { lyrics } from './lyrics'
import { loginUser } from './login_user'
import { currentPlayingTrack } from './current_playing_track'


const rootReducer = combineReducers({
    loginUser,
    currentPlayingTrack,
    lyrics
});
  
export default rootReducer;