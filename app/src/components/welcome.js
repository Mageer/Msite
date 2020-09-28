import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { Alert } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import LoginSpotify from "./auth/LoginSpotify";
import { refreshUser } from "../actions/user";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  userLogin: {
    margin: "auto",
    paddingTop: "20vh",
  },
});

function Welcome() {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.user.loggedIn);
  const classes = useStyles();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  if (loggedIn) {
    return <Redirect to="/my-playlists" />;
  }

  return (
    <>
      <Alert severity="info">Press the icon to log in!</Alert>
      <div className={classes.root}>
        <LoginSpotify />
      </div>
    </>
  );
}

export default Welcome;
