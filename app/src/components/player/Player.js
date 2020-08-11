import React from 'react';
import { useSelector } from 'react-redux';
import jwt from 'jsonwebtoken';
import useSpotifyPlayer from './useSpotifyPlayer';
import PlayerControls from './PlayerControls';

function Player() {
  const jwtToken = useSelector((state) => state.user.accessToken);
  const decodedJwt = jwt.decode(jwtToken);
  const spotifyAccessToken = decodedJwt.tokens.spotify;

  const player = useSpotifyPlayer(spotifyAccessToken);

  if (!player) {
    return (
      <div>
        Please wait
      </div>
    );
  }

  return(
    <PlayerControls player={player}/>
  );
}

export default Player;
