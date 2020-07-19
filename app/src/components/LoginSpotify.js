import React from 'react';

function LoginSpotify(props) {
  const { accessToken } = props;

  const login = () => {
    const bearer = `Bearer ${accessToken}`;
    const options = {
      method: 'GET',
      headers: {
        Authorization: bearer,
      },
    };

    return fetch('/spotify/login', options)
      .then((res) => res.json())
      .then((body) => window.location.assign(body.url))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h3>
        Connect account to Spotify
      </h3>
      <button onClick={login}>
        login
      </button>
    </div>
  );
}

export default LoginSpotify;
