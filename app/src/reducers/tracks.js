import {
  SEARCH_TRACKS_REQUEST,
  SEARCH_TRACKS_SUCCESS,
  SEARCH_TRACKS_FAILURE,
  PLAYLIST_TRACKS_REQUEST,
  PLAYLIST_TRACKS_SUCCESS,
  PLAYLIST_TRACKS_FAILURE,
  RESET_TRACK_LIST,
} from '../actions/tracks';

const initialTracks = {
  list: [],
  search: null,
  playlistId: null,
  error: null,
  endOfList: false,
  isFetching: false,
};

function searchTracksRequest(state, action) {
  return {
    ...state,
    error: null,
    isFetching: true,
  };
}

function playlistTracksRequest(state, action) {
  return {
    ...state,
    error: null,
    isFetching: true,
  };
}

function receiveTracks(state, action) {
  if (!action.tracks.length) {
    return {
      ...state,
      endOfList: true,
      isFetching: false,
    }
  }
  const newTracks = [...state.list, ...action.tracks];
  return {
    ...state,
    list: newTracks,
    endOfList: false,
    isFetching: false,
  };
}

function requestFailed(state, action) {
  return {
    ...state,
    error: action.error,
    endOfList: true,
    isFetching: false,
  };
}

function resetTrackList(state, action) {
  const search = action.search || null;
  const playlistId = action.playlistId || null;
  return {
    ...state,
    list: [],
    search,
    playlistId,
    error: null,
    endOfList: false,
    isFetching: false,
  };
}


function tracks(state = initialTracks, action) {
  switch (action.type) {
    case SEARCH_TRACKS_REQUEST:
      return searchTracksRequest(state, action);
    case SEARCH_TRACKS_SUCCESS:
      return receiveTracks(state, action);
    case SEARCH_TRACKS_FAILURE:
      return requestFailed(state, action);
    case PLAYLIST_TRACKS_REQUEST:
      return playlistTracksRequest(state, action);
    case PLAYLIST_TRACKS_SUCCESS:
      return receiveTracks(state, action);
    case PLAYLIST_TRACKS_FAILURE:
      return requestFailed(state, action);
    case RESET_TRACK_LIST:
      return resetTrackList(state, action);
    default:
      return state;
  }
}

export default tracks;
