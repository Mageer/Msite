import React from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import queryString from 'query-string';

function SpotifyCallback({ loginUserSuccess }) {
  const location = useLocation();
  const parsed = queryString.parse(location.search);

  const { username, accessToken } = parsed;
  loginUserSuccess(username, accessToken);

  return (
    <div>
      <h1>
        Spotify call-back
      </h1>
      <Redirect to="/home" />
    </div>
  );
}

export default SpotifyCallback;
