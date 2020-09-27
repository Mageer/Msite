import React from "react";
import { Route } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import MusicSearchResult from "./musicSearch/MusicSearchResult";
import PlaylistTrackList from "./playlists/PlaylistTrackList";
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

  return (
    <div className={classes.root}>
      <Route path={"/search"} component={() => <MusicSearchResult />} />
      <Route path={"/my-playlists"} component={() => <PlaylistsList />} />
      <Route path={"/playlist"} component={() => <PlaylistTrackList />} />
    </div>
  );
}

export default MiddlePanel;
