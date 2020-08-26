import React from 'react';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import CurrentPlayingTrackAlbumArt from './tracks/CurrentPlayingTrackAlbumArt';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
  },
  albumArt: {

  },
  playlists: {
    flex: '1',
  },
});

function LeftPanel() {
  const classes = useStyles();
  return(
    <Paper elevation={2} square className={classes.root}>
      <div>
        <CurrentPlayingTrackAlbumArt />
      </div>
      <div className={classes.playlists}>
        My Library
      </div>

    </Paper>
  );
}

export default LeftPanel;
