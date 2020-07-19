import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
} from '../actions/registerUser';

const initialLoginUser = {
  loggedIn: false,
  username: '',
  isFetching: false,
  access_token: '',
};

function loginUser(state = initialLoginUser, action) {
  switch (action.type) {
    case REGISTER_USER_REQUEST:
      return {
        ...state,
        loggedIn: false,
        username: action.username,
        isFetching: true,
      };
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        username: action.username,
        isFetching: false,
        accessToken: action.access_token,
      };
    case REGISTER_USER_FAILURE:
      return {
        ...state,
        loggedIn: false,
        username: action.username,
        isFetching: false,
      };
    default:
      return state;
  }
}

export default loginUser;
