import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SplitPane from 'react-split-pane';
import Lyrics from './lyrics/Lyrics';
import SearchTracks from './tracks/SearchTracks';
import TracksList from './tracks/TracksList';
import TrackInformation from './tracks/TrackInformation';
import PlayerControls from './player/PlayerControls';

const useStyles = makeStyles({
  root: {
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: 'red',
  },
  root1: {
    position: 'relative',
    height: '95vh',
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: 'green',
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
    borderStyle: 'solid',
    bordercolor:'red',
    borderWidth:'1px',
  },
  inner: {
    display: 'table',
    margin: '10px auto',
    overflowY: 'scroll',
    width: '95%',
    borderStyle: 'solid',
    bordercolor:'yellow',
    borderWidth:'1px',
  },
});

function Home() {
  const { loggedIn } = useSelector((state) => state.user, shallowEqual);
  const classes = useStyles();

  if (!loggedIn) {
    return <Redirect to='/' />;
  }

  return (
    <div className={classes.root1}>
      <SplitPane split="vertical" defaultSize="50%" className={classes.root}>

        <div className={classes.leftPane}>
          <div className={classes.inner}>
            <SearchTracks />
            <div style={{
              width: '100%',
              height: '450px',
              overflowY: 'scroll',
            }}>
            <Box>
              <TracksList />
            </Box>
            </div>
          <div>
            <TrackInformation />
            <PlayerControls />
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
