import {
  REQUEST_SEARCH_TRACKS,
  SUCCESS_SEARCH_TRACKS,
  FAILURE_SEARCH_TRACKS,
} from "../actions/search";

const limit = 50;

const initialSearch = {
  currentSearchId: "",
  items: [],
};

function requestSearchTracks(state, action) {
  const tracks = state.items[action.query]
    ? [...state.items[action.query].tracks]
    : [];

  return {
    ...state,
    items: {
      ...state.items,
      [action.query]: {
        tracks,
        isExhausted: false,
        isFetching: true,
        error: null,
      },
    },
  };
}

const getExhaustedStatus = (action) => (action.tracks.length < limit);
function successSearchTracks(state, action) {
  return {
    ...state,
    items: {
      ...state.items,
      [action.query]: {
        tracks: [...state.items[action.query].tracks, ...action.tracks],
        isExhausted: getExhaustedStatus(action),
        isFetching: false,
        error: null,
      },
    },
  };
}

function failureSearchTracks(state, action) {
  return {
    ...state,
    items: {
      ...state.items,
      [action.query]: {
        ...state.items[action.query],
        isFetching: false,
        error: action.error,
      },
    },
  };
}

function search(state = initialSearch, action) {
  switch (action.type) {
    case REQUEST_SEARCH_TRACKS:
      return requestSearchTracks(state, action);
    case SUCCESS_SEARCH_TRACKS:
      return successSearchTracks(state, action);
    case FAILURE_SEARCH_TRACKS:
      return failureSearchTracks(state, action);
    default:
      return state;
  }
}

export default search;
