import React from 'react';
import Script from 'react-load-script';
import jwt from 'jsonwebtoken';

function SpotifyPlayer(props) {
  const { jwtToken } = props;

  window.onSpotifyWebPlaybackSDKReady = () => {
    const decodedJwt = jwt.decode(jwtToken);
    const token = decodedJwt.tokens.spotify;
    const player = new window.Spotify.Player({
      name: 'Web Playback SDK Quick Start Player',
      getOAuthToken: (cb) => { cb(token); },
    });
    player.connect();
  };

  const handleCreate = () => console.log('loading');
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
