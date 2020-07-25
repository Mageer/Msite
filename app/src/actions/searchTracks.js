export const SEARCH_TRACKS_REQUEST = 'SEARCH_TRACKS_REQUEST';
const searchTracksRequest = (searchQuery) => ({
  type: SEARCH_TRACKS_REQUEST,
  searchQuery,
});

export const SEARCH_TRACKS_SUCCESS = 'SEARCH_TRACKS_SUCCESS';
const searchTracksSuccess = (tracks) => ({
  type: SEARCH_TRACKS_SUCCESS,
  tracks,
});

export const SEARCH_TRACKS_FAILURE = 'SEARCH_TRACKS_FAILURE';
const searchTracksFailure = (searchQuery, error) => ({
  type: SEARCH_TRACKS_FAILURE,
  error,
});

export const fetchTracks = (searchQuery) => (dispatch, getState) => {
  dispatch(searchTracksRequest(searchQuery));

  const { accessToken } = getState().user;
  const bearer = `Bearer ${accessToken}`;
  const options = {
    method: 'GET',
    headers: {
      Authorization: bearer,
    },
  };
  return fetch(`/spotify/tracks?search=${encodeURI(searchQuery)}`, options)
    .then((res) => {
      if (!res.ok) {
        throw new Error('No match');
      }
      return res.json();
    })
    .then((tracks) => dispatch(searchTracksSuccess(tracks)))
    .catch((error) => dispatch(searchTracksFailure(error.message)));
};
