import React, { useState } from 'react';
import Slider from '@material-ui/core/Slider';
import { makeStyles } from '@material-ui/styles';
import VolumeUpRoundedIcon from '@material-ui/icons/VolumeUpRounded';
import VolumeOffRoundedIcon from '@material-ui/icons/VolumeOffRounded';
import lime from '@material-ui/core/colors/lime';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  muted: {
    paddingRight: '5px',
    '&:hover': {
      color: lime[500],
      cursor: 'pointer',
    },
    '&:active': {
      color: lime[800],
      cursor: 'pointer',
    },
  }
})

function VolumeControl(props) {
  const { setVolume } = props;
  const classes = useStyles();
  const [sliderValue, setSliderValue] = useState(100);
  const [muted, setMuted] = useState(false);

  const volumeIcon = () => {
    if (muted || sliderValue === 0){
      return <VolumeOffRoundedIcon className={classes.root} onClick={() => {
        setMuted(false);
        setVolume(sliderValue/100);
      }} />;
    }
    return <VolumeUpRoundedIcon className={classes.root} onClick={() => {
      setMuted(true);
      setVolume(0);
    }} />;
  }

  const onSeek = (event, value) => {
    setSliderValue(value);
    setVolume(value/100);
  }

  return(
    <div className={classes.root}>
      <div className={classes.muted}>
        {volumeIcon()}
      </div>
      <Slider defaultValue={100} disabled={muted} onChange={onSeek} style={{ 
    maxWidth: '100px', }}/>
    </div>
  );
}

export default VolumeControl;
