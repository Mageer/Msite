export const SEARCH_TRACKS_REQUEST = 'SEARCH_TRACKS_REQUEST';
export const SEARCH_TRACKS_SUCCESS = 'SEARCH_TRACKS_SUCCESS';
export const SEARCH_TRACKS_FAILURE = 'SEARCH_TRACKS_FAILURE';
export const PLAYLIST_TRACKS_FAILURE = 'PLAYLIST_TRACKS_FAILURE';
export const PLAYLIST_TRACKS_REQUEST = 'PLAYLIST_TRACKS_REQUEST';
export const PLAYLIST_TRACKS_SUCCESS = 'PLAYLIST_TRACKS_SUCCESS';
export const RESET_TRACK_LIST = 'RESET_TRACK_LIST';

const searchTracksRequest = (search, limit, offset) => ({
  type: SEARCH_TRACKS_REQUEST,
  search,
  limit,
  offset,
});
const searchTracksSuccess = (tracks) => ({
  type: SEARCH_TRACKS_SUCCESS,
  tracks,
});
const searchTracksFailure = (error) => ({
  type: SEARCH_TRACKS_FAILURE,
  error,
});


const playlistTracksRequest = (playlistId, limit, offset) => ({
  type: PLAYLIST_TRACKS_REQUEST,
  playlistId,
  limit,
  offset,
});
const playlistTracksSuccess = (tracks) => ({
  type: PLAYLIST_TRACKS_SUCCESS,
  tracks,
});
const playlistTracksFailure = (error) => ({
  type: PLAYLIST_TRACKS_FAILURE,
  error,
});

export const resetTrackList = ({ search, playlistId }) => ({
  type: RESET_TRACK_LIST,
  search,
  playlistId,
})

const fetchTracks = (accessToken, pathname, limit, offset) => {
  const bearer = `Bearer ${accessToken}`;
  const options = {
    method: 'GET',
    headers: {
      Authorization: bearer,
    },
  };
  return fetch(`${pathname}&limit=${encodeURI(limit)}&offset=${encodeURI(offset)}`, options)
    .then((res) => {
      if (!res.ok) {
        throw new Error('No match');
      }
      return res.json();
    })
}

export const fetchSearchedTracks = (search, limit, offset) => (dispatch, getState) => {
  dispatch(searchTracksRequest(search, limit, offset));
  const { accessToken } = getState().user;
  fetchTracks(accessToken, `/spotify/tracks?search=${encodeURI(search)}`, limit, offset)
    .then((tracks) => dispatch(searchTracksSuccess(tracks)))
    .catch((error) => dispatch(searchTracksFailure(error.message)));
};

export const fetchPlaylistTracks = (playlistId, limit, offset) => (dispatch, getState) => {
  dispatch(playlistTracksRequest(playlistId, limit, offset));
  const { accessToken } = getState().user;
  fetchTracks(accessToken, `/spotify/playlist?uri=${playlistId}`, limit, offset)
    .then((tracks) => dispatch(playlistTracksSuccess(tracks)))
    .catch((error) => dispatch(playlistTracksFailure(error.message)));
};
