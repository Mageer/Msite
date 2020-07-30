import React from 'react';
import Script from 'react-load-script';

function LoadSpotifyPlaybackSDKScript() {
  window.onSpotifyWebPlaybackSDKReady = () => { console.log('Attempt') };

  const handleCreate = () => console.log('Spotify player loading');
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

export default LoadSpotifyPlaybackSDKScript;
