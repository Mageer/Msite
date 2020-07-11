import {
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
} from '../actions/login_user'


const initialLoginUser = {
    loggedIn: true,
    username: '',
    isFetching: false,
    access_token: '',
}

export const loginUser = (state = initialLoginUser, action) => {
    switch (action.type) {
        case LOGIN_USER_REQUEST:
            return {
                ...state,
                loggedIn: false,
                username: action.username,
                isFetching: true,
            }
        case LOGIN_USER_SUCCESS:
            return {
                ...state,
                loggedIn: true,
                username: action.username,
                isFetching: false,
                access_token: action.access_token,
            }
        case LOGIN_USER_FAILURE:
            return {
                ...state,
                loggedIn: false,
                username: action.username,
                isFetching: false,
            }
        default:
            return state;
    }
}

