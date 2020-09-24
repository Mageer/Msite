import {
  SET_CURRENT_LYRICS_ID,
  LYRICS_REQUEST,
  LYRICS_SUCCESS,
  LYRICS_FAILURE,
} from "../actions/lyrics";

const initialLyrics = {
  currentLyricsId: undefined,
  items: {},
};

function setCurrentLyricsId(state, action) {
  return {
    ...state,
    currentLyricsId: action.id,
  };
}

function lyricsRequest(state, action) {
  const newItem = {
    name: "",
    lyrics: "",
    isFetching: true,
    error: null,
  };
  return {
    ...state,
    items: {
      ...state.items,
      [action.id]: newItem,
    },
  };
}

function lyricsSuccess(state, action) {
  const newItem = {
    name: action.name,
    lyrics: action.lyrics,
    isFetching: false,
    error: null,
  };
  return {
    ...state,
    items: {
      ...state.items,
      [action.id]: newItem,
    },
  };
}

function lyricsFailure(state, action) {
  const newItem = {
    name: "",
    lyrics: "",
    isFetching: false,
    error: "Lyrics not found",
  };
  return {
    ...state,
    items: {
      ...state.items,
      [action.id]: newItem,
    },
  };
}

function lyrics(state = initialLyrics, action) {
  switch (action.type) {
    case SET_CURRENT_LYRICS_ID:
      return setCurrentLyricsId(state, action);
    case LYRICS_REQUEST:
      return lyricsRequest(state, action);
    case LYRICS_SUCCESS:
      return lyricsSuccess(state, action);
    case LYRICS_FAILURE:
      return lyricsFailure(state, action);
    default:
      return state;
  }
}

export default lyrics;
