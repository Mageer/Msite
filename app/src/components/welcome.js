import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { refreshUser } from "../actions/user";

const useStyles = makeStyles({
  container: {
    height: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

function Welcome() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { loggedIn, error: loginFailed } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  if (loggedIn) {
    return <Redirect to="/home" />;
  }
  if (loginFailed) {
    return <Redirect to="/login" />;
  }

  return (
    <div className={classes.container}>
      <CircularProgress />
    </div>
  );
}

export default Welcome;
