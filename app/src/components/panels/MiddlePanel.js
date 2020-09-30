import React from "react";
import { Route } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import MusicSearchResult from "../musicSearch/MusicSearchResult";
import PlaylistTrackList from "../playlists/PlaylistTrackList";
import MyPlaylists from "../playlists/MyPlaylists";
import "../../scrollbar.css";

const useStyles = makeStyles((theme) => ({
  root: {
    overflowY: "auto",
    height: "100%",
    background: theme.palette.background.levelOne,
    color: "#F7F7F7",
  },
}));

function MiddlePanel() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Route path={"/search"} component={() => <MusicSearchResult />} />
      <Route path={"/home"} component={() => <MyPlaylists />} />
      <Route path={"/playlist"} component={() => <PlaylistTrackList />} />
    </div>
  );
}

export default MiddlePanel;
