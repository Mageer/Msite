import {
  REQUEST_PLAYLIST_TRACKS,
  SUCCESS_PLAYLIST_TRACKS,
  FAILURE_PLAYLIST_TRACKS,
} from "../actions/playlists";

const limit = 50;

const initialPlaylists = {
  currentPlaylistId: "",
  items: [],
};

function requestPlaylistTracks(state, action) {
  const tracks = state.items[action.id]
    ? [...state.items[action.id].tracks]
    : [];

  return {
    ...state,
    items: {
      ...state.items,
      [action.id]: {
        tracks,
        isExhausted: false,
        isFetching: true,
        error: null,
      },
    },
  };
}

const getExhaustedStatus = (action) => (action.tracks.length < limit);
function successPlaylistTracks(state, action) {
  return {
    ...state,
    items: {
      ...state.items,
      [action.id]: {
        tracks: [...state.items[action.id].tracks, ...action.tracks],
        isExhausted: getExhaustedStatus(action),
        isFetching: false,
        error: null,
      },
    },
  };
}

function failurePlaylistTracks(state, action) {
  return {
    ...state,
    items: {
      ...state.items,
      [action.id]: {
        ...state.items[action.id],
        isFetching: false,
        error: action.error,
      },
    },
  };
}

function playlists(state = initialPlaylists, action) {
  switch (action.type) {
    case REQUEST_PLAYLIST_TRACKS:
      return requestPlaylistTracks(state, action);
    case SUCCESS_PLAYLIST_TRACKS:
      return successPlaylistTracks(state, action);
    case FAILURE_PLAYLIST_TRACKS:
      return failurePlaylistTracks(state, action);
    default:
      return state;
  }
}

export default playlists;
