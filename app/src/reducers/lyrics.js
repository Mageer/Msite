import {
  LYRICS_REQUEST,
  LYRICS_SUCCESS,
  LYRICS_FAILURE,
} from '../actions/lyrics';

const initialLyrics = {
  searchQuery: '',
  songName: '',
  isFetching: false,
  lyrics: '',
};

function lyrics(state = initialLyrics, action) {
  switch (action.type) {
    case LYRICS_REQUEST:
      return {
        ...state,
        searchQuery: action.searchQuery,
        songName: '',
        lyrics: '',
        isFetching: true,
      };
    case LYRICS_SUCCESS:
      return {
        ...state,
        songName: action.songName,
        isFetching: false,
        lyrics: action.lyrics,
      };
    case LYRICS_FAILURE: // Add failure message
      return {
        ...state,
        searchQuery: action.searchQuery,
        songName: '',
        isFetching: false,
        lyrics: 'Lyrics not found',
      };
    default:
      return state;
  }
}

export default lyrics;
