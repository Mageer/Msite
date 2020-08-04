import React from 'react';
import { Card } from '@material-ui/core';
import SeekBar from './SeekBar';
import PreviousButton from './PreviousButton';
import PlayButton from './PlayButton';
import NextButton from './NextButton';
import VolumeButton from './VolumeButton';

function PlayerControls(props) {
  const { player } = props;

  return (
    <Card>
      <SeekBar
        getPosition={() => player.getCurrentState()
          .then((state) => {
            if (!state) {
              return 0;
            }
            return state.position;
          })
        }
        seek={(ms) => player.seek(ms)}
      />
      <br/>
      <PreviousButton onClick={() => player.previousTrack()}/>
      <PlayButton resume={() => player.resume()} pause={() => player.pause()} />
      <NextButton onClick={() => player.nextTrack()}/>
      <VolumeButton mute={() => player.setVolume(0)} unMute={() => player.setVolume(0.5)}/>
    </Card>
  );
}

export default PlayerControls;
