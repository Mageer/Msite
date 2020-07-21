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


function VolumeButton() {
  const classes = useStyles();
  const [mute, setMute] = useState(false);

  const toggleMute = () => {
    if (mute) {
      return <VolumeOffRoundedIcon className={classes.root} onClick={() => {
        setMute(false);
      }} />
    }
    return <VolumeUpRoundedIcon className={classes.root} onClick={() => {
        setMute(true);
      }} />
  }

  return (
    toggleMute()
  );
}

export default VolumeButton;
