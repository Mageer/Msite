import React, { useState } from 'react';
import PlayArrowRounded from '@material-ui/icons/PlayArrowRounded';
import PauseRounded from '@material-ui/icons/PauseRounded';
import { makeStyles } from '@material-ui/core/styles';

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


function PlayButton() {
  const classes = useStyles();
  const [playing, setPlaying] = useState(true);

  const togglePlay = () => {
    if (playing) {
      return <PlayArrowRounded className={classes.root} onClick={() => {
        setPlaying(false);
        }} />
    }
    return <PauseRounded className={classes.root} onClick={() => {
      setPlaying(true);
      }} />
  };

  return (
    togglePlay()
  );
}

export default PlayButton;
