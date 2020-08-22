import React from 'react';
import SeekBar from './SeekBar';
import PlayerButtons from './PlayerButtons';

function PlayerControls(props) {
  const { player } = props;

  const getPosition = () => player.getCurrentState()
  .then((state) => {
    if (!state) {
      return 0;
    }
    return state.position;
  });

  return (
    <div>
      <SeekBar
        getPosition={getPosition}
        seek={(ms) => player.seek(ms)}
      />
      <PlayerButtons
        previousTrack={() => player.previousTrack()}
        resume={() => player.resume()} 
        pause={() => player.pause()}
        nextTrack={() => player.nextTrack()}
      />
    </div>
  );
}

export default PlayerControls;
