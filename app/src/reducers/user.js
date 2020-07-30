import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  REFRESH_USER_REQUEST,
  REFRESH_USER_SUCCESS,
  REFRESH_USER_FAILURE,
} from '../actions/user';

const initialLoginUser = {
  loggedIn: false,
  username: '',
  isLoggingIn: false,
  isRefreshing: false,
  accessToken: '',
};

/* For developmental purposes, username and access_token have to be taken manually from sever */
// const dev = {
//     loggedIn: true,
//     username: '',
//     isFetching: false,
//     accessToken: ''
// }

function user(state = initialLoginUser, action) {
  switch (action.type) {
    case LOGIN_USER_REQUEST:
      return {
        ...state,
        loggedIn: false,
        username: action.username,
        isLoggingIn: true,
        accessToken: '',
        error: '',
      };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        username: action.username,
        isLoggingIn: false,
        accessToken: action.accessToken,
        error: '',
      };
    case LOGIN_USER_FAILURE:
      return {
        ...state,
        loggedIn: false,
        username: action.username,
        isLogginIn: false,
        accessToken: '',
        error: action.error,
      };
    case REFRESH_USER_REQUEST:
      return {
        ...state,
        isRefreshing: true,
        error: '',
      };
    case  REFRESH_USER_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        isRefreshing: false,
        username: action.username,
        accessToken: action.accessToken,
      };
    case  REFRESH_USER_FAILURE:
      return {
        ...state,
        isRefreshing: false,
        isLoggedIn: false,
        error: action.error,
      }
    default:
      return state;
  }
}

export default user;
