import {
    USER_PLAYLISTS_REQUEST,
    USER_PLAYLISTS_SUCCESS,
    USER_PLAYLISTS_FAILURE,
  } from '../actions/userPlaylists';
  
  const initialPlaylists = {
    playlists: null,
    error: '',
    isFetching: false,
  };
  
  function userPlaylists(state = initialPlaylists, action) {
    switch (action.type) {
      case USER_PLAYLISTS_REQUEST:
        return {
          ...state,
          playlists: null,
          error: '',
          isFetching: true,
        };
      case USER_PLAYLISTS_SUCCESS:
        return {
          ...state,
          playlists: action.playlists,
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
  