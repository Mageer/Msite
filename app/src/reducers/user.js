import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAILURE,
  REFRESH_USER_REQUEST,
  REFRESH_USER_SUCCESS,
  REFRESH_USER_FAILURE,
} from "../actions/user";

const initialLoginUser = {
  loggedIn: false,
  username: "",
  isLoggingIn: false,
  isLogginOut: false,
  isRefreshing: false,
  accessToken: "",
};

const loginUserRequest = (state, action) => ({
  ...state,
  loggedIn: false,
  username: action.username,
  isLoggingIn: true,
  accessToken: "",
  error: "",
});
const loginUserSuccess = (state, action) => ({
  ...state,
  loggedIn: true,
  username: action.username,
  isLoggingIn: false,
  accessToken: action.accessToken,
  error: "",
});
const loginUserFailure = (state, action) => ({
  ...state,
  loggedIn: false,
  username: action.username,
  isLogginIn: false,
  accessToken: "",
  error: action.error,
});

const logoutUserRequest = (state) => ({
  ...state,
  isLogginOut: true,
});
const logoutUserSuccess = (state) => ({
  ...state,
  loggedIn: false,
  logginOut: false,
  username: "",
  accessToken: "",
  error: "",
});
const logoutUserFailure = (state, action) => ({
  ...state,
  error: action.error,
});

const refreshUserRequest = (state) => ({
  ...state,
  isRefreshing: true,
  error: "",
});
const refreshUserSuccess = (state, action) => ({
  ...state,
  loggedIn: true,
  isRefreshing: false,
  username: action.username,
  accessToken: action.accessToken,
});
const refreshUserFailure = (state, action) => ({
  ...state,
  isRefreshing: false,
  isLoggedIn: false,
  error: action.error,
});

function user(state = initialLoginUser, action) {
  switch (action.type) {
    case LOGIN_USER_REQUEST:
      return loginUserRequest(state, action);
    case LOGIN_USER_SUCCESS:
      return loginUserSuccess(state, action);
    case LOGIN_USER_FAILURE:
      return loginUserFailure(state, action);
    case LOGOUT_USER_REQUEST:
      return logoutUserRequest(state);
    case LOGOUT_USER_SUCCESS:
      return logoutUserSuccess(state);
    case LOGOUT_USER_FAILURE:
      return logoutUserFailure(state, action);
    case REFRESH_USER_REQUEST:
      return refreshUserRequest(state);
    case REFRESH_USER_SUCCESS:
      return refreshUserSuccess(state, action);
    case REFRESH_USER_FAILURE:
      return refreshUserFailure(state, action);
    default:
      return state;
  }
}

export default user;
