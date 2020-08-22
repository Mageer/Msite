import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LoginSpotify from './auth/LoginSpotify';
import { refreshUser } from '../actions/user';

const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
  userLogin: {
    margin: 'auto',
    paddingTop: '20vh',
  },
});

function Welcome() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch])

  const loggedIn = useSelector((state) => state.user.loggedIn);
  const classes = useStyles();

  // TODO: FOR TESTING
  if (loggedIn) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid container
      direction="column"
      justify="center"
      alignItems="center"
      flex-start="center"
    >
      <Grid item>
        <LoginSpotify />
      </Grid>
    </Grid>
  );
}

export default Welcome;
