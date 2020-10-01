import apiCall from "../lib/apiCall";
import { fetchDevices } from "./devices";
import { initialLoadDone } from "./initialLoad";

export const PLAYBACK_UPDATE = "PLAYBACK_STATUS_UPDATE";
export const TRANSFER_PLAYBACK_REQUEST = "TRANSFER_PLAYBACK_REQUEST";
export const TRANSFER_PLAYBACK_SUCCESS = "TRANSFER_PLAYBACK_SUCCESS";
export const TRANSFER_PLAYBACK_FAILURE = "TRANSFER_PLAYBACK_FAILURE";

export const playbackUpdate = (currentTrack, duration, position, paused) => ({
  type: PLAYBACK_UPDATE,
  currentTrack,
  duration,
  position,
  paused,
});

export const transferPlaybackRequest = (deviceId) => ({
  type: TRANSFER_PLAYBACK_REQUEST,
  deviceId,
});
export const transferPlaybackSuccess = (deviceId) => ({
  type: TRANSFER_PLAYBACK_SUCCESS,
  deviceId,
});
export const transferPlaybackFailure = (error) => ({
  type: TRANSFER_PLAYBACK_FAILURE,
  error,
});

export const transferPlayback = (device_id) => (dispatch, getState) =>
  apiCall({
    request: () => transferPlaybackRequest(device_id),
    success: () => transferPlaybackSuccess(device_id),
    failure: (error) => transferPlaybackFailure(error),
    method: "PUT",
    path: `/spotify/transfer-playback?device_id=${encodeURI(device_id)}`,
    dispatch,
    getState,
  });

export const transferPlaybackOnDeviceLoad = (
  myDeviceId,
  maxTries = 10,
  intervalLength = 500
) => (dispatch, getState) => {
  let tries = 0;
  const intervalId = setInterval(() => {
    let devices = getState().devices.items;
    let isDeviceLoaded = devices.some((device) => device.id === myDeviceId);
    if (isDeviceLoaded) {
      dispatch(transferPlayback(myDeviceId)).then(() =>
        dispatch(initialLoadDone())
      );

      return clearInterval(intervalId);
    }
    if (tries < maxTries) {
      tries++;
      dispatch(fetchDevices());
    } else {
      clearInterval(intervalId);
    }
  }, intervalLength);
};
