import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SplitPane from 'react-split-pane';
import Lyrics from './Lyrics';
import SpotifyPlayer from './SpotifyPlayer';
import SearchTracks from './SearchTracks';
import TracksList from './TracksList';

const useStyles = makeStyles({
  root: {
    height: '600px',
  },
  leftPane: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    margin: '10px',
    padding: '15px',
    marginRight: '5px',
    overflowY: 'auto',
    wordWrap: 'break-word',
    height: '95vh',
  },
  rightPane: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    margin: '10px',
    padding: '15px',
    marginLeft: '5px',
    overflowY: 'auto',
    wordWrap: 'break-word',
    height: '95vh',
  },
  inner: {
    display: 'table',
    margin: '10px auto',
    width: '95%',
  },
});

function Home() {
  const { loggedIn } = useSelector((state) => state.loginUser, shallowEqual);
  const classes = useStyles();

  if (!loggedIn) {
    return <Redirect to='/' />;
  }

  return (
    <div className={classes.root}>
      <SpotifyPlayer />
      <SplitPane split="vertical" defaultSize="50%" className={classes.root}>

        <div className={classes.leftPane}>
          <div className={classes.inner}>
            <SearchTracks />
            <div style={{
              width: '100%',
              height: '500px',
              overflowY: 'scroll',
            }}>
            <Box>
              <TracksList />
            </Box>
            </div>

          </div>
        </div>

        <div className={classes.rightPane}>
          <div className={classes.inner}>
            <Lyrics />
          </div>
        </div>

      </SplitPane>
    </div>
  );
}

export default Home;
