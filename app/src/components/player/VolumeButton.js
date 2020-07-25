import React, { useState } from 'react';
import VolumeUpRoundedIcon from '@material-ui/icons/VolumeUpRounded';
import VolumeOffRoundedIcon from '@material-ui/icons/VolumeOffRounded';
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


function VolumeButton(props) {
  const classes = useStyles();
  const [muted, setMuted] = useState(false);
  const { mute, unMute } = props;

  if (muted) {
    return <VolumeOffRoundedIcon className={classes.root} onClick={() => {
      setMuted(false);
      unMute();
    }} />;
  }
  return <VolumeUpRoundedIcon className={classes.root} onClick={() => {
      setMuted(true);
      mute();
    }} />;
}

export default VolumeButton;
