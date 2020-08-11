import React from 'react';
import SpotifyLogo from '../../media/spotify_logo.png'; 

function LoginSpotify() {
  const login = () => {
    return fetch('/login/spotify', { method: 'POST' })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('Login failed');
      })
      .then((body) => window.location.assign(body.url))
      .catch((err) => console.log(err));
  };

  return (
    <div style={{ color: 'white' }}>
      <h3>
        Login with Spotify
      </h3>
      <button>
        <img src={SpotifyLogo} alt="my img" onClick={login} />
      </button>
    </div>
  );
}

export default LoginSpotify;
