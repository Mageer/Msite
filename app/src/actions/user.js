import apiCall from "../lib/apiCall";

export const LOGIN_USER_REQUEST = "LOGIN_USER_REQUEST";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAILURE = "LOGIN_USER_FAILURE";
export const LOGOUT_USER_REQUEST = "LOGOUT_USER_REQUEST";
export const LOGOUT_USER_SUCCESS = "LOGOUT_USER_SUCCESS";
export const LOGOUT_USER_FAILURE = "LOGOUT_USER_FAILURE";
export const REFRESH_USER_REQUEST = "REFRESH_USER_REQUEST";
export const REFRESH_USER_SUCCESS = "REFRESH_USER_SUCCESS";
export const REFRESH_USER_FAILURE = "REFRESH_USER_FAILURE";

const loginUserRequest = (username, password) => ({
  type: LOGIN_USER_REQUEST,
  username,
  password,
});
export const loginUserSuccess = (username, accessToken) => ({
  type: LOGIN_USER_SUCCESS,
  username,
  accessToken,
});
const loginUserFailure = (username, error) => ({
  type: LOGIN_USER_FAILURE,
  username,
  error,
});

const logoutUserRequest = () => ({
  type: LOGOUT_USER_REQUEST,
});
const logoutUserSuccess = () => ({
  type: LOGOUT_USER_SUCCESS,
});
const logoutUserFailure = (error) => ({
  type: LOGOUT_USER_FAILURE,
  error,
});

const refreshUserRequest = () => ({
  type: REFRESH_USER_REQUEST,
});
export const refreshUserSuccess = (username, accessToken) => ({
  type: REFRESH_USER_SUCCESS,
  username,
  accessToken,
});
const refreshUserFailure = (error) => ({
  type: REFRESH_USER_FAILURE,
  error,
});

export const loginUser = (username, password) => (dispatch) => {
  dispatch(loginUserRequest(username, password));
  const data = { username, password };
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      credentials: "include",
    },
    body: JSON.stringify(data),
  };
  return fetch(`${process.env.REACT_APP_API_URI}/user/login`, options)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Unauthorized");
      }
      return res.json();
    })
    .then(({ accessToken }) =>
      dispatch(loginUserSuccess(username, accessToken))
    )
    .catch((error) => dispatch(loginUserFailure(username, error.message)));
};

export const logoutUser = () => (dispatch, getState) =>
  apiCall({
    request: logoutUserRequest,
    success: logoutUserSuccess,
    failure: (error) => logoutUserFailure(error),
    method: "POST",
    credentials: "include",
    path: `/user/logout`,
    dispatch,
    getState,
  });

/* Username and refresh token should be in cookies */
export const refreshUser = (callback) => (dispatch) => {
  dispatch(refreshUserRequest());
  fetch(`${process.env.REACT_APP_API_URI}/user/new-access-token`, {
    method: "POST",
    credentials: "include",
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Unauthorized");
      }
      return res.json();
    })
    .then(({ username, accessToken }) => {
      if (callback) {
        callback(accessToken);
      }
      return dispatch(refreshUserSuccess(username, accessToken));
    })
    .catch((error) => dispatch(refreshUserFailure(error.message)));
};
