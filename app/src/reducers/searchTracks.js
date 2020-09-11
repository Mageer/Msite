import {
  SEARCH_TRACKS_REQUEST,
  SEARCH_TRACKS_SUCCESS,
  SEARCH_TRACKS_FAILURE,
} from '../actions/searchTracks';

const initialTracks = {
  tracks: null,
  searchQuery: '',
  error: '',
  isFetching: false,
};

function searchTracks(state = initialTracks, action) {
  switch (action.type) {
    case SEARCH_TRACKS_REQUEST:
      return {
        ...state,
        tracks: null,
        searchQuery: action.searchQuery,
        error: '',
        isFetching: true,
      };
    case SEARCH_TRACKS_SUCCESS:
      return {
        ...state,
        tracks: action.tracks,
        isFetching: false,
      };
    case SEARCH_TRACKS_FAILURE:
      return {
        ...state,
        error: action.error,
        isFetching: false,
      };
    default:
      return state;
  }
}

export default searchTracks;
