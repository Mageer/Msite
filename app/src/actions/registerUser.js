export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
const registerUserRequest = (username, password) => ({
  type: REGISTER_USER_REQUEST,
  username,
  password,
});

export const REGISTER_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
const registerUserSuccess = (username, accessToken) => ({
  type: REGISTER_USER_SUCCESS,
  username,
  accessToken,
});

export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE';
const registerUserFailure = (username) => ({
  type: REGISTER_USER_FAILURE,
  username,
});

export const registerUser = (username, password) => (dispatch) => {
  dispatch(registerUserRequest(username, password));

  const data = { username, password };
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  return fetch('/user/register', options)
    .then((res) => res.json())
    .then(({ accessToken }) => dispatch(registerUserSuccess(username, accessToken)))
    .catch(() => dispatch(registerUserFailure(username)));
};
