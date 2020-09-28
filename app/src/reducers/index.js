import { combineReducers } from "redux";
import lyrics from "./lyrics";
import user from "./user";
import playbackStatus from "./playbackStatus";
import userPlaylists from "./userPlaylists";
import playlists from "./playlists";
import search from "./search";
import devices from "./devices";
import initialLoad from "./initialLoad";

const rootReducer = combineReducers({
  user,
  playbackStatus,
  lyrics,
  userPlaylists,
  playlists,
  search,
  devices,
  initialLoad,
});

export default rootReducer;
