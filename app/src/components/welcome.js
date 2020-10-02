import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { refreshUser } from "../actions/user";
import SmallLoadingScreen from "./misc/SmallLoadingScreen";

function Welcome() {
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
  return <SmallLoadingScreen />;
}

export default Welcome;
