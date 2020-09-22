import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Paper, Card, CardMedia } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { fetchUserPlaylists } from "../actions/userPlaylists";
import CurrentPlayingTrackAlbumArt from "./tracks/CurrentPlayingTrackAlbumArt";
import CurrentPlayingTrackInformation from "./tracks/CurrentPlayingTrackInformation";
import "../scrollbar.css";

const useStyles = makeStyles({
  root: {
    display: "flex",
    height: "100%",
    flexDirection: "column",
    background: "#424242",
    padding: "10px",
  },
  trackAlbumArt: {
    lineHeight: '0',
  },
  trackInformation: {
    flex: "1",
    overflowY: "auto",
  },
  space: {
    paddingTop: "10px",
  },
});

function LeftPanel() {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserPlaylists());
  }, [dispatch]);

  return (
    <Paper elevation={3} square className={classes.root}>
      <Paper elevation={3} square className={classes.trackAlbumArt}>
        <CurrentPlayingTrackAlbumArt />
      </Paper>
      <div className={classes.space}></div>
      <div className={classes.trackInformation} id="scrollbar">
        <CurrentPlayingTrackInformation />
      </div>
    </Paper>
  );
}

export default LeftPanel;
