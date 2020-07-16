export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
const loginUserRequest = (username, password) => ({
    type: LOGIN_USER_REQUEST,
    username,
    password,
});


export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const loginUserReceive = (username, access_token) => ({
    type: LOGIN_USER_SUCCESS,
    username,
    access_token,
});


export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';
const loginUserFailure = (username, err) => ({
    type: LOGIN_USER_FAILURE,
    username,
    err,
})


export const loginUser = (username, password) => {
    return (dispatch) => {
        dispatch(loginUserRequest(username, password));

        const data = { username, password }
        const options = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(data)
        }

        return fetch("/user/login", options)
                    .then(res => {
                        if ( !res.ok ) {
                            throw new Error('Unauthorized');
                        }
                        return res.json();
                    })
                    .then(({ access_token }) => dispatch(loginUserReceive(username, access_token)))
                    .catch(error => dispatch(loginUserFailure(username, error.message)));
    }
}
