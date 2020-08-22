import React from 'react';
import { useSelector } from 'react-redux';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  name: {

  },
  artist: {
    color: 'gray',
  },
});

function CurrentPlayingTrackInformation() {
  const track = useSelector((state) => state.playbackStatus.currentTrack);
  const classes = useStyles();

  if (!track) {
    return (
      <div></div>
    );
  }

  const name = track.name;
  const artist = track.artists[0].name;
  return (
    <div>
      <Typography variant='h5' className={classes.name}>{name}</Typography>
      <Typography variant='body1' className={classes.artist}>{artist}</Typography>
    </div>
  );
}

export default CurrentPlayingTrackInformation;