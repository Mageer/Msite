export const DEVICES_REQUEST = 'DEVICES_REQUEST';
const devicesRequest = () => ({
  type: DEVICES_REQUEST
});

export const DEVICES_SUCCESS = 'DEVICES_SUCCESS';
const devicesSuccess = (devices) => ({
  type: DEVICES_SUCCESS,
  devices,
});

export const DEVICES_FAILURE = 'DEVICES_FAILURE';
const devicesFailure = (error) => ({
  type: DEVICES_FAILURE,
  error,
});


export const fetchDevices = () => (dispatch, getState) => {
    dispatch(devicesRequest());
    const { accessToken } = getState().user;
    const bearer = `Bearer ${accessToken}`;
    const options = {
      method: 'GET',
      headers: {
        Authorization: bearer,
      },
    };
    return fetch(`${process.env.REACT_APP_API_URI}/spotify/devices`, options)
    .then((res) => {
      if (!res.ok) {
        throw new Error('Unable to get devices');
      }
      return res.json()
    }).then((devices) => dispatch(devicesSuccess(devices)))
    .catch((err) => dispatch(devicesFailure(err)));
  }
