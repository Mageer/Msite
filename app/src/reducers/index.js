import { combineReducers } from "redux";
import lyrics from "./lyrics";
import user from "./user";
import playback from "./playback";
import userPlaylists from "./userPlaylists";
import playlists from "./playlists";
import search from "./search";
import devices from "./devices";
import initialLoad from "./initialLoad";

const rootReducer = combineReducers({
  user,
  playback,
  lyrics,
  userPlaylists,
  playlists,
  search,
  devices,
  initialLoad,
});

export default rootReducer;
