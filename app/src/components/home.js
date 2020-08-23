import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LeftPanel from './LeftPanel';
import MiddlePanel from './MiddlePanel';
import RightPanel from './RightPanel';
import BottomPanel from './BottomPanel';
import useNewAccessToken from './auth/useNewAccessToken';

const useStyles = makeStyles({
  root: {
    height: '100%',
  },
  topPanel: {
    height: 'calc(100% - 89px)',
    marginBottom: '5px',
  },
  topPanelItem: {
    height: '100%'
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
      <div className={classes.topPanel}>
        <Grid container
          direction="row"
          justify="center"
          alignItems="flex-start"
          flex-start="center"
          spacing={1}
          className={classes.topPanelItem}
        >
          <Grid item xs={2} className={classes.topPanelItem}><LeftPanel /></Grid>
          <Grid item xs={7} className={classes.topPanelItem}><MiddlePanel /></Grid>
          <Grid item xs={3} className={classes.topPanelItem}><RightPanel /></Grid>
        </Grid>
      </div>
      <div>
        <BottomPanel /> {/*height of element is 88px */}
      </div>
    </div>
  );
}

export default Home;
