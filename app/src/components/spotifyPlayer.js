import React from 'react'
import Script from 'react-load-script'
import jwt from 'jsonwebtoken'

export default function ({ jwt_token }) {

    window.onSpotifyWebPlaybackSDKReady = () => {
        const decoded_jwt = jwt.decode(jwt_token);        
        const token = decoded_jwt.tokens.spotify;
        const player = new window.Spotify.Player({
          name: 'Web Playback SDK Quick Start Player',
          getOAuthToken: cb => { cb(token); }
        });
        player.connect();
      };

    const handleCreate = () => (console.log('loading'))
    const handleError = () => (console.log('Spotify player failed to load'))
    const handleLoad = () => (console.log('Spotify player loaded'))

    return(
        <Script 
            url="https://sdk.scdn.co/spotify-player.js"
            onCreate={handleCreate}
            onError={handleError}
            onLoad={handleLoad}
        />
    )
}