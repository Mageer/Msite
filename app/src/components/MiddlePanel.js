import React from "react";
import { useRouteMatch, Route, useLocation } from "react-router-dom";
import qs from "query-string";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MusicSearchResult from "./musicSearch/MusicSearchResult";
import PlaylistsList from "./playlists/PlaylistsList";
import "../scrollbar.css";

const useStyles = makeStyles({
  root: {
    overflowY: "auto",
    height: "100%",
    backgroundColor: "#1C1C1C",
    color: "#F7F7F7",
  },
});

function MiddlePanel() {
  const classes = useStyles();
  const { path } = useRouteMatch();
  const location = useLocation();
  const params = qs.parse(location.search);

  return (
    <div className={classes.root}>
      <Route path={"/search"} component={() => <MusicSearchResult />} />
      <Route path={"/my-playlists"} component={() => <PlaylistsList />} />
    </div>
  );
}

export default MiddlePanel;
