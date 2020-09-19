import { transferPlayback } from "./playbackStatus";

export const DEVICES_REQUEST = "DEVICES_REQUEST";
export const DEVICES_SUCCESS = "DEVICES_SUCCESS";
export const DEVICES_FAILURE = "DEVICES_FAILURE";

const devicesRequest = () => ({
  type: DEVICES_REQUEST,
});
const devicesSuccess = (devices) => ({
  type: DEVICES_SUCCESS,
  devices,
});
const devicesFailure = (error) => ({
  type: DEVICES_FAILURE,
  error,
});

export const fetchDevices = () => (dispatch, getState) => {
  dispatch(devicesRequest());
  const { accessToken } = getState().user;
  const bearer = `Bearer ${accessToken}`;
  const options = {
    method: "GET",
    headers: {
      Authorization: bearer,
    },
  };
  return fetch(`${process.env.REACT_APP_API_URI}/spotify/devices`, options)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Unable to get devices");
      }
      return res.json();
    })
    .then((devices) => dispatch(devicesSuccess(devices)))
    .catch((err) => dispatch(devicesFailure(err)));
};

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
      dispatch(transferPlayback(myDeviceId));
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
