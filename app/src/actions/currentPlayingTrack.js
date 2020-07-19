import { fetchLyrics } from './lyrics';

export const CURRENT_PLAYING_TRACK_REQUEST = 'CURRENT_PLAYING_TRACK_REQUEST';
const currentPlayingTrackRequest = (accessToken) => ({
  type: CURRENT_PLAYING_TRACK_REQUEST,
  accessToken,
});

export const CURRENT_PLAYING_TRACK_SUCCESS = 'CURRENT_PLAYING_TRACK_SUCCESS';
const currentPlayingTrackSuccess = (trackName) => ({
  type: CURRENT_PLAYING_TRACK_SUCCESS,
  trackName,
});

export const CURRENT_PLAYING_TRACK_FAILURE = 'CURRENT_PLAYING_TRACK_FAILURE';
const currentPlayingTrackFailure = () => ({
  type: CURRENT_PLAYING_TRACK_FAILURE,
});

export const fetchCurrentPlayingTrack = (accessToken) => (dispatch) => {
  dispatch(currentPlayingTrackRequest(accessToken));
  const bearer = `Bearer ${accessToken}`;
  const options = {
    method: 'GET',
    headers: {
      Authorization: bearer,
    },
  };

  return fetch('/spotify/current-playing-track', options)
    .then((res) => res.json())
    .then(({ trackName }) => dispatch(currentPlayingTrackSuccess(trackName)))
    .catch(() => dispatch(currentPlayingTrackFailure()));
};

export const fetchCurrentPlayingTrackLyrics = () => (dispatch, getState) => {
  const { accessToken } = getState().loginUser;
  dispatch(fetchCurrentPlayingTrack(accessToken))
    .then(() => {
      const { trackName } = getState().currentPlayingTrack;
      dispatch(fetchLyrics(trackName));
    }).catch((err) => console.log(err));
};
