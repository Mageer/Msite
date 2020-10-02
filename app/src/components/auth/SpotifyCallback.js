import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import queryString from "query-string";
import SmallLoadingScreen from "../misc/SmallLoadingScreen";

function SpotifyCallback() {
  const dispatch = useDispatch();
  const history = useHistory();

  const location = useLocation();
  const parsed = queryString.parse(location.search);
  const { code } = parsed;

  useEffect(() => {
    const options = { method: "POST", credentials: "include" };
    const url = `${process.env.REACT_APP_API_URI}/login-with-spotify/callback?code=${code}`;
    fetch(url, options).then(() => {
      history.replace("/");
    });
  }, [code, dispatch]);

  return <SmallLoadingScreen />;
}

export default SpotifyCallback;
