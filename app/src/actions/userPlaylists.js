import apiCall from "../lib/apiCall";

export const USER_PLAYLISTS_REQUEST = "USER_PLAYLISTS_REQUEST";
export const USER_PLAYLISTS_SUCCESS = "USER_PLAYLISTS_SUCCESS";
export const USER_PLAYLISTS_FAILURE = "USER_PLAYLISTS_FAILURE";

const userPlaylistsRequest = () => ({
  type: USER_PLAYLISTS_REQUEST,
});
const userPlaylistsSuccess = (playlists) => ({
  type: USER_PLAYLISTS_SUCCESS,
  playlists,
});
const userPlaylistsFailure = (error) => ({
  type: USER_PLAYLISTS_FAILURE,
  error,
});

export const fetchUserPlaylists = () => (dispatch, getState) =>
  apiCall({
    request: userPlaylistsRequest,
    success: (playlists) => userPlaylistsSuccess(playlists),
    failure: (error) => userPlaylistsFailure(error.message),
    method: "GET",
    path: `/spotify/user-playlists`,
    dispatch,
    getState,
  });
