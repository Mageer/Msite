import React from "react";
import { Alert } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import LoginSpotify from "./auth/LoginSpotify";

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

function Login() {
  const classes = useStyles();

  return (
    <>
      <Alert severity="info">Press the icon to log in!</Alert>
      <div className={classes.root}>
        <LoginSpotify />
      </div>
    </>
  );
}

export default Login;
