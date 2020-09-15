export const USER_PLAYLISTS_REQUEST = 'USER_PLAYLISTS_REQUEST';
const userPlaylistsRequest = () => ({
  type: USER_PLAYLISTS_REQUEST,
});

export const USER_PLAYLISTS_SUCCESS = 'USER_PLAYLISTS_SUCCESS';
const userPlaylistsSuccess = (playlists) => ({
  type: USER_PLAYLISTS_SUCCESS,
  playlists,
});

export const USER_PLAYLISTS_FAILURE = 'USER_PLAYLISTS_FAILURE';
const userPlaylistsFailure = (error) => ({
  type: USER_PLAYLISTS_FAILURE,
  error,
});

export const fetchUserPlaylists = () => (dispatch, getState) => {
  dispatch(userPlaylistsRequest());

  const { accessToken } = getState().user;
  const bearer = `Bearer ${accessToken}`;
  const options = {
    method: 'GET',
    headers: {
      Authorization: bearer,
    },
  };
  return fetch(`${process.env.REACT_APP_API_URI}/spotify/user-playlists`, options)
    .then((res) => {
      if (!res.ok) {
        throw new Error('Unable to fetch user playlists');
      }
      return res.json();
    })
    .then((playlists) => dispatch(userPlaylistsSuccess(playlists)))
    .catch((error) => dispatch(userPlaylistsFailure(error.message)));
}
