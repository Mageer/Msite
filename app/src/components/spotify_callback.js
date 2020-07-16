import React from 'react'
import { Redirect, useLocation } from 'react-router-dom'
import queryString from 'query-string' 

export default function ({ loginUserReceive }) {
    const location = useLocation();
    const parsed = queryString.parse(location.search);

    const username = parsed.username;
    const access_token = parsed.access_token;
    loginUserReceive(username, access_token);

    return (
        <div>
            <h1>
                Spotify call-back
            </h1>
            <Redirect to="/home" />
        </div>
    );
}