import React from 'react';
import { useSelector } from 'react-redux';
import Script from 'react-load-script';
import jwt from 'jsonwebtoken';

function SpotifyPlayer() {
  const jwtToken = useSelector((state) => state.loginUser.accessToken);

  window.onSpotifyWebPlaybackSDKReady = () => {
    const decodedJwt = jwt.decode(jwtToken);
    const token = decodedJwt.tokens.spotify;
    const player = new window.Spotify.Player({
      name: 'M-site',
      getOAuthToken: (cb) => { cb(token); },
    });
    player.connect();
  };

  const handleCreate = () => console.log('Spotify playe loading');
  const handleError = () => console.log('Spotify player failed to load');
  const handleLoad = () => console.log('Spotify player loaded');

  return (
    <Script
      url="https://sdk.scdn.co/spotify-player.js"
      onCreate={handleCreate}
      onError={handleError}
      onLoad={handleLoad}
    />
  );
}

export default SpotifyPlayer;
