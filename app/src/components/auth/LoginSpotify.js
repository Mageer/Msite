import React from 'react';
import { Grid } from '@material-ui/core';
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
    <Grid container
      direction="column"
      justify="center"
      alignItems="center"
    >   
    <Grid item>
      <div style={{ color: 'white' }}>
        <h3>
          Login with Spotify
        </h3>
      </div>
    </Grid>

    <Grid item>
      <button>
        <img 
          src={SpotifyLogo} 
          alt="my img" 
          onClick={login} 
          style={{
            width: '256px', 
            height: '256px',
          }}
        />
      </button>
    </Grid>
    </Grid>
  );
}

export default LoginSpotify;
