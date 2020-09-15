export const LYRICS_REQUEST = 'LYRICS_REQUEST';
const lyricsRequest = (searchQuery) => ({
  type: LYRICS_REQUEST,
  searchQuery,
});

export const LYRICS_SUCCESS = 'LYRICS_SUCCESS';
const lyricsSuccess = (songName, lyrics) => ({
  type: LYRICS_SUCCESS,
  songName,
  lyrics,
});

export const LYRICS_FAILURE = 'LYRICS_FAILURE';
const lyricsFailure = (searchQuery) => ({
  type: LYRICS_FAILURE,
  searchQuery,
});

export const fetchLyrics = (searchQuery) => (dispatch) => {
  dispatch(lyricsRequest(searchQuery));
  return fetch(`${process.env.REACT_APP_API_URI}/lyrics?search=${encodeURI(searchQuery)}`)
    .then((res) => res.json())
    .then(({ name, lyrics }) => dispatch(lyricsSuccess(name, lyrics)))
    .catch(() => dispatch(lyricsFailure(searchQuery)));
};
