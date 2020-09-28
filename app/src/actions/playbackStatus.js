export const PLAYBACK_STATUS_UPDATE = "PLAYBACK_STATUS_UPDATE";
export const playbackStatusUpdate = (
  currentTrack,
  duration,
  position,
  paused
) => ({
  type: PLAYBACK_STATUS_UPDATE,
  currentTrack,
  duration,
  position,
  paused,
});

export const TRANSFER_PLAYBACK_REQUEST = "TRANSFER_PLAYBACK_REQUEST";
export const transferPlaybackRequest = (deviceId) => ({
  type: TRANSFER_PLAYBACK_REQUEST,
  deviceId,
});

export const TRANSFER_PLAYBACK_SUCCESS = "TRANSFER_PLAYBACK_SUCCESS";
export const transferPlaybackSuccess = (deviceId) => ({
  type: TRANSFER_PLAYBACK_SUCCESS,
  deviceId,
});

export const TRANSFER_PLAYBACK_FAILURE = "TRANSFER_PLAYBACK_FAILURE";
export const transferPlaybackFailure = (error) => ({
  type: TRANSFER_PLAYBACK_FAILURE,
  error,
});

export const transferPlayback = (device_id) => (dispatch, getState) => {
  dispatch(transferPlaybackRequest(device_id));
  const { accessToken } = getState().user;
  const bearer = `Bearer ${accessToken}`;
  const options = {
    method: "PUT",
    headers: {
      Authorization: bearer,
    },
  };
  return fetch(
    `${
      process.env.REACT_APP_API_URI
    }/spotify/transfer-playback?device_id=${encodeURI(device_id)}`,
    options
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error("Unable to transfer playback");
      }
      return dispatch(transferPlaybackSuccess(device_id));
    })
    .catch((err) => dispatch(transferPlaybackFailure(err)));
};
