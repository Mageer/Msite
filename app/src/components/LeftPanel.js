import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { fetchUserPlaylists } from '../actions/userPlaylists';
import CurrentPlayingTrackAlbumArt from './tracks/CurrentPlayingTrackAlbumArt';
import UserPlaylists from './UserPlaylists';
import '../scrollbar.css';

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
    overflowY: 'auto',
  },
});

function LeftPanel() {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserPlaylists());
  }, [dispatch]);

  return(
    <Paper elevation={0} square className={classes.root}>
      <div>
        <CurrentPlayingTrackAlbumArt />
      </div>
      <div className={classes.playlists} id='scrollbar'>
        <UserPlaylists />
      </div>

    </Paper>
  );
}

export default LeftPanel;
