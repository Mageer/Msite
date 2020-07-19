import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import LoginUser from '../containers/LoginUser';

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
  const loggedIn = useSelector((state) => state.loginUser.loggedIn, shallowEqual);
  const classes = useStyles();

  if (loggedIn) {
    return <Redirect to="/home" />;
  }

  return (
    <div className={classes.root}>
      <div className={classes.userLogin}>
        <LoginUser />
      </div>
    </div>
  );
}

export default Welcome;
