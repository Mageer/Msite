import React from 'react';
import PlayArrowRounded from '@material-ui/icons/PlayArrowRounded';
import PauseRounded from '@material-ui/icons/PauseRounded';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';

const useStyles = makeStyles({
  root: {
    '&:hover': {
      color: 'rgb(153, 255, 153, 0.8)',
      cursor: 'pointer',
    },
    '&:active': {
      color: 'rgb(153, 255, 153, 0.5)',
      cursor: 'pointer',
    },
    fontSize: '50px',
  },
})


function PlayButton(props) {
  const classes = useStyles();
  const { resume, pause } = props;
  const paused = useSelector((state) => state.playbackStatus.paused);

  if (paused) {
    return <PlayArrowRounded className={classes.root} onClick={() => resume()} />
  }
  return <PauseRounded className={classes.root} onClick={() => pause()} />
}

export default PlayButton;
