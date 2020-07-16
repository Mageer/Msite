import {
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
} from '../actions/login_user'


const initialLoginUser = {
    loggedIn: false,
    username: '',
    isFetching: false,
    access_token: '',
}

/* For developmental purposes, username and access_token have to be taken manually from sever */
// const dev = {
//     loggedIn: true,
//     username: 'test',
//     isFetching: false,
//     access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJ0b2tlbnMiOnsic3BvdGlmeSI6IkJRQ0Q5OURPcUw4SC11dktBUF9PeTljLUxIU2YxOTNjRUpGWUYwQlFnbEhuLXlTTGc0MkVCVFgtZmN0aFVyNGtxaDlDcjJibDkyMlRpN3U5bG1sdWdpVWNBVFE5UXpoU1BQeEdsSUV6ZS1qRW50TjNfSHpGb2lQLWpZTnI1MnRWRlNSREdDYWlaeW80blowU0U2WFlnZ250bC1GdWJ6T2dlMVRraWJMQjNrRFZGVE1hcTVDLTFLczJUS09pR20tYUVkYTVoZjhsVnRaZ3M2RU16T1dhVVZzT3A3Y212Mk0ifSwiaWF0IjoxNTk0NTEzMTMzLCJleHAiOjE1OTQ1MTY3MzN9.cffmtcykeVbGzCXPEkAshvzX9BZNbdi1tnmjrfKmRUw'
// }

export const loginUser = (state = initialLoginUser, action) => {
    switch (action.type) {
        case LOGIN_USER_REQUEST:
            return {
                ...state,
                loggedIn: false,
                username: action.username,
                isFetching: true,
                error: ''
            }
        case LOGIN_USER_SUCCESS:
            return {
                ...state,
                loggedIn: true,
                username: action.username,
                isFetching: false,
                access_token: action.access_token,
                error: ''
            }
        case LOGIN_USER_FAILURE:
            return {
                ...state,
                loggedIn: false,
                username: action.username,
                isFetching: false,
                error: action.err,
            }
        default:
            return state;
    }
}

