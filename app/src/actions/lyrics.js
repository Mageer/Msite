export const SET_CURRENT_LYRICS_ID = "SET_CURRENT_LYRICS_ID";
export const LYRICS_REQUEST = "LYRICS_REQUEST";
export const LYRICS_SUCCESS = "LYRICS_SUCCESS";
export const LYRICS_FAILURE = "LYRICS_FAILURE";

export const setCurrentLyricsId = (id) => ({
  type: SET_CURRENT_LYRICS_ID,
  id,
});

const lyricsRequest = (id) => ({
  type: LYRICS_REQUEST,
  id,
});
const lyricsSuccess = (id, name, lyrics) => ({
  type: LYRICS_SUCCESS,
  id,
  name,
  lyrics,
});
const lyricsFailure = (id) => ({
  type: LYRICS_FAILURE,
  id,
});

export const fetchLyrics = (id) => (dispatch) => {
  dispatch(lyricsRequest(id));
  return fetch(
    `${process.env.REACT_APP_API_URI}/lyrics?search=${encodeURI(id)}`
  )
    .then((res) => res.json())
    .then(({ name, lyrics }) => dispatch(lyricsSuccess(id, name, lyrics)))
    .catch(() => dispatch(lyricsFailure(id)));
};
