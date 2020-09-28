import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useLocation } from "react-router-dom";
import queryString from "query-string";
import { loginUserSuccess } from "../../actions/user";

function SpotifyCallback() {
  const loggedIn = useSelector((state) => state.user.loggedIn);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const parsed = queryString.parse(location.search);
    const { username, accessToken } = parsed;
    dispatch(loginUserSuccess(username, accessToken));
  }, [location, dispatch]);

  if (loggedIn) {
    return <Redirect to="/my-playlists" />;
  }

  return <div>Logging in</div>;
}

export default SpotifyCallback;
