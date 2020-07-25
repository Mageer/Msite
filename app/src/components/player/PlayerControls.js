import React from 'react';
import { useSelector } from 'react-redux';
import jwt from 'jsonwebtoken';
import { Card } from '@material-ui/core';
import SeekBar from './SeekBar';
import PreviousButton from './PreviousButton';
import PlayButton from './PlayButton';
import NextButton from './NextButton';
import VolumeButton from './VolumeButton';
import useSpotifyPlayer from './useSpotifyPlayer';

function PlayerControls() {
  const jwtToken = useSelector((state) => state.user.accessToken);
  const decodedJwt = jwt.decode(jwtToken);
  const spotifyAccessToken = decodedJwt.tokens.spotify;

  const player = useSpotifyPlayer(spotifyAccessToken);

  return (
    <Card>
      <SeekBar seek={(ms) => player.seek(ms)}/>
      <br/>
      <PreviousButton onClick={() => player.previousTrack()}/>
      <PlayButton resume={() => player.resume()} pause={() => player.pause()} />
      <NextButton onClick={() => player.nextTrack()}/>
      <VolumeButton mute={() => player.setVolume(0)} unMute={() => player.setVolume(1)}/>
    </Card>
  );
}

export default PlayerControls;
