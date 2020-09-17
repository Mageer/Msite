import {
    DEVICES_REQUEST,
    DEVICES_SUCCESS,
    DEVICES_FAILURE,
  } from '../actions/devices';
  
  const initialDevices = {
    devices: [],
    isFetching: false,
    error: null,
  };
  
  function devices(state = initialDevices, action) {
    switch (action.type) {
      case DEVICES_REQUEST:
        return {
          ...state,
          devices: [],
          isFetching: true,
          error: null,
        };
      case DEVICES_SUCCESS:
        return {
          ...state,
          devices: [...action.devices],
          isFetching: false,
        };
      case DEVICES_FAILURE:
        return {
          ...state,
          isFetching: false,
          error: action.error,
        };
      default:
        return state;
    }
  }
  
  export default devices;
  