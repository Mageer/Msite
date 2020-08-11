import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import LoginSpotify from './auth/LoginSpotify';
import { refreshUser } from '../actions/user';

const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
  userLogin: {
    margin: 'auto',
    padding: '15px',
    paddingTop: '100px',
    top: '50%',
  },
});

function Welcome() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch])

  const loggedIn = useSelector((state) => state.user.loggedIn);
  const classes = useStyles();

  if (loggedIn) {
    return <Redirect to="/home" />;
  }

  return (
    <div className={classes.root}>
      <div className={classes.userLogin}>
        <LoginSpotify />
      </div>
    </div>
  );
}

export default Welcome;
