import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import SplitPane from 'react-split-pane';
import Lyrics from './Lyrics';
import SpotifyPlayer from './SpotifyPlayer';
import RefreshAccessToken from './RefreshAccessToken';
import LoginSpotify from './LoginSpotify';

const useStyles = makeStyles({
  root: {
    height: '95vh',
  },
  leftPane: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    color: 'white',
    margin: '10px',
    padding: '15px',
    marginRight: '5px',
    overflowY: 'auto',
    wordWrap: 'break-word',
    height: '95vh',
  },
  rightPane: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    color: 'white',
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
  },
});

function Home() {
  const { loggedIn } = useSelector((state) => state.loginUser, shallowEqual);
  const classes = useStyles();

  if (!loggedIn) {
    return <Redirect to='/' />;
  }

  return (
    <div>
      <SplitPane split="vertical" defaultSize="50%" className={classes.root}>

        <div className={classes.leftPane}>
          <div className={classes.inner}>
            <SpotifyPlayer />
            <RefreshAccessToken />
            <LoginSpotify />
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
