import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
} from '../actions/loginUser';

const initialLoginUser = {
  loggedIn: false,
  username: '',
  isFetching: false,
  accessToken: '',
};

/* For developmental purposes, username and access_token have to be taken manually from sever */
// const dev = {
//     loggedIn: true,
//     username: '',
//     isFetching: false,
//     accessToken: ''
// }

function loginUser(state = initialLoginUser, action) {
  switch (action.type) {
    case LOGIN_USER_REQUEST:
      return {
        ...state,
        loggedIn: false,
        username: action.username,
        isFetching: true,
        accessToken: '',
        error: '',
      };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        username: action.username,
        isFetching: false,
        accessToken: action.accessToken,
        error: '',
      };
    case LOGIN_USER_FAILURE:
      return {
        ...state,
        loggedIn: false,
        username: action.username,
        isFetching: false,
        accessToken: '',
        error: action.err,
      };
    default:
      return state;
  }
}

export default loginUser;
