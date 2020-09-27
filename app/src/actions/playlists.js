import apiCall from "../lib/apiCall";

export const REQUEST_PLAYLIST_TRACKS = "REQUEST_PLAYLIST_TRACKS";
export const SUCCESS_PLAYLIST_TRACKS = "SUCCESS_PLAYLIST_TRACKS";
export const FAILURE_PLAYLIST_TRACKS = "FAILURE_PLAYLIST_TRACKS";

const requestPlaylistTracks = (id) => ({
  type: REQUEST_PLAYLIST_TRACKS,
  id,
});
const successPlaylistTracks = (id, tracks) => ({
  type: SUCCESS_PLAYLIST_TRACKS,
  id,
  tracks,
});
const failurePlaylistTracks = (id, error) => ({
  type: FAILURE_PLAYLIST_TRACKS,
  id,
  error,
});

export const fetchMoreTracks = (id) => (dispatch, getState) => {
  const item = getState().playlists.items[id];
  const offset = item ? item.tracks.length : 0;
  apiCall({
    request: () => requestPlaylistTracks(id),
    success: (tracks) => successPlaylistTracks(id, tracks),
    failure: (error) => failurePlaylistTracks(id, error),
    method: "GET",
    path: `/spotify/playlistTracks?id=${encodeURI(id)}&offset=${offset}`,
    dispatch,
    getState,
  });
};
