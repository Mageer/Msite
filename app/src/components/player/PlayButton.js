import React from 'react';
import PlayArrowRounded from '@material-ui/icons/PlayArrowRounded';
import PauseRounded from '@material-ui/icons/PauseRounded';
import { useSelector } from 'react-redux';

function PlayButton(props) {
  const { resume, pause, className } = props;
  const paused = useSelector((state) => state.playbackStatus.paused);

  if (paused) {
    return <PlayArrowRounded className={className} onClick={() => resume()} />
  }
  return <PauseRounded className={className} onClick={() => pause()} />
}

export default PlayButton;
