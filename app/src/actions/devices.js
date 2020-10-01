import apiCall from "../lib/apiCall";

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

export const fetchDevices = () => (dispatch, getState) =>
  apiCall({
    request: devicesRequest,
    success: (devices) => devicesSuccess(devices),
    failure: (error) => devicesFailure(error),
    method: "GET",
    path: `/spotify/devices`,
    dispatch,
    getState,
  });
