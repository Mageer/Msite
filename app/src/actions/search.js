import apiCall from "../lib/apiCall";

export const REQUEST_SEARCH_TRACKS = "REQUEST_SEARCH_TRACKS";
export const SUCCESS_SEARCH_TRACKS = "SUCCESS_SEARCH_TRACKS";
export const FAILURE_SEARCH_TRACKS = "FAILURE_SEARCH_TRACKS";

const requestSearchTracks = (query) => ({
  type: REQUEST_SEARCH_TRACKS,
  query,
});
const successSearchTracks = (query, tracks) => ({
  type: SUCCESS_SEARCH_TRACKS,
  query,
  tracks,
});
const failureSearchTracks = (query, error) => ({
  type: FAILURE_SEARCH_TRACKS,
  query,
  error,
});

export const fetchMoreTracks = (query) => (dispatch, getState) => {
  const item = getState().search.items[query];
  const offset = item ? item.tracks.length : 0;
  apiCall({
    request: () => requestSearchTracks(query),
    success: (tracks) => successSearchTracks(query, tracks),
    failure: (error) => failureSearchTracks(query, error),
    method: "GET",
    path: `/spotify/tracks?search=${encodeURI(query)}&offset=${offset}`,
    dispatch,
    getState,
  });
};
