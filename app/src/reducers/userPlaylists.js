import {
    USER_PLAYLISTS_REQUEST,
    USER_PLAYLISTS_SUCCESS,
    USER_PLAYLISTS_FAILURE,
  } from '../actions/userPlaylists';
  
  const initialPlaylists = {
    items: [],
    error: '',
    isFetching: false,
  };
  
  function userPlaylists(state = initialPlaylists, action) {
    switch (action.type) {
      case USER_PLAYLISTS_REQUEST:
        return {
          ...state,
          items: [],
          error: '',
          isFetching: true,
        };
      case USER_PLAYLISTS_SUCCESS:
        return {
          ...state,
          items: action.playlists,
          isFetching: false,
        };
      case USER_PLAYLISTS_FAILURE:
        return {
          ...state,
          error: action.error,
          isFetching: false,
        };
      default:
        return state;
    }
  }
  
  export default userPlaylists;
  