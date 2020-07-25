import React from 'react';
import Script from 'react-load-script';

function SpotifyPlayer() {
  window.onSpotifyWebPlaybackSDKReady = () => { console.log('Attempt') };

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
