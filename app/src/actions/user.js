export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';
export const REFRESH_USER_REQUEST = 'REFRESH_USER_REQUEST';
export const REFRESH_USER_SUCCESS = 'REFRESH_USER_SUCCESS';
export const REFRESH_USER_FAILURE = 'REFRESH_USER_FAILURE';

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

const loginUserFailure = (username, err) => ({
  type: LOGIN_USER_FAILURE,
  username,
  err,
});

const refreshUserRequest = () => ({
  type: REFRESH_USER_REQUEST,
})

const refreshUserSuccess = (username, accessToken) => ({
  type: REFRESH_USER_SUCCESS,
})

const refreshUserFailure = (error) => ({
  type: REFRESH_USER_FAILURE,
})


export const loginUser = (username, password) => (dispatch) => {
  dispatch(loginUserRequest(username, password));

  const data = { username, password };
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  return fetch('/user/login', options)
    .then((res) => {
      if (!res.ok) {
        throw new Error('Unauthorized');
      }
      return res.json();
    })
    .then(({ accessToken }) => dispatch(loginUserSuccess(username, accessToken)))
    .catch((error) => dispatch(loginUserFailure(username, error.message)));
};


/* Username and refresh token should be in cookies */
export const refreshUser = () => (dispatch) => {
  dispatch(refreshUserRequest());
  fetch('/user/new-access-token', { method: 'POST' })
    .then((res) => {
      if (!res.ok) {
        throw new Error('Unauthorized');
      }
      return res.json();
    })
    .then(({ username, accessToken }) => dispatch(refreshUserSuccess(username, accessToken)))
    .catch((error) => dispatch(refreshUserFailure(error.message)));
}
