import React from 'react';
import { Card } from '@material-ui/core';
import SeekBar from './SeekBar';
import PreviousButton from './PreviousButton';
import PlayButton from './PlayButton';
import NextButton from './NextButton';
import VolumeButton from './VolumeButton';

function Player() {
  return (
    <Card>
      <SeekBar />
      <br/>
      <PreviousButton />
      <PlayButton />
      <NextButton />
      <VolumeButton />
    </Card>
  );
}

export default Player;
