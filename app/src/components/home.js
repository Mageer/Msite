import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SplitPane from 'react-split-pane';
import Lyrics from './lyrics/Lyrics';
import SearchTracks from './tracks/SearchTracks';
import TracksList from './tracks/TracksList';
import TrackInformation from './tracks/TrackInformation';
import Player from './player/Player';
import useNewAccessToken from './auth/useNewAccessToken';

const useStyles = makeStyles({
  root: {
    position: 'relative',
    height: '95vh',
  },
  leftPane: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    margin: '10px',
    padding: '15px',
    marginRight: '5px',
    wordWrap: 'break-word',
  },
  rightPane: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    margin: '10px',
    padding: '15px',
    marginLeft: '5px',
    height: '95%',
    wordWrap: 'break-word',
  },
  inner: {
    display: 'table',
    margin: '10px auto',
    overflowY: 'scroll',
    width: '95%',
  },
});

function Home() {
  const loggedIn = useSelector((state) => state.user.loggedIn);
  const classes = useStyles();
  useNewAccessToken();

  if (!loggedIn) {
    return <Redirect to='/' />;
  }

  return (
    <div className={classes.root}>
      <SplitPane split="vertical" defaultSize="70%" className={classes.root}>

        <div className={classes.leftPane}>
          <div className={classes.inner}>
            <SearchTracks />
            <div style={{
              width: '100%',
              height: '750px',
              overflowY: 'scroll',
            }}>
            <Box>
              <TracksList />
            </Box>
            </div>
          <div>
            <TrackInformation />
            <Player />
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
