import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { fetchUserPlaylists } from '../actions/userPlaylists';
import CurrentPlayingTrackAlbumArt from './tracks/CurrentPlayingTrackAlbumArt';
import CurrentPlayingTrackInformation from "./tracks/CurrentPlayingTrackInformation";
import '../scrollbar.css';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
  },
  trackAlbumArt: {

  },
  trackInformation: {
    flex: '1',
    padding: '5px',
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
      <div className={classes.trackAblumArt}>
        <CurrentPlayingTrackAlbumArt />
      </div>
      <div className={classes.trackInformation} id='scrollbar'>
        <CurrentPlayingTrackInformation />
      </div>

    </Paper>
  );
}

export default LeftPanel;
