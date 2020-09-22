import React from "react";
import { useLocation } from "react-router-dom";
import { Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import qs from "query-string";
import TrackList from "../tracks/TrackList";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  header: {
    textAlign: "center",
    padding: "10px",
  },
  results: {
    height: "100%",
  },
});

function MusicSearchResult() {
  const classes = useStyles();
  const location = useLocation();
  const params = qs.parse(location.search);

  return (
    <div className={classes.container}>
      <Paper square elevation={2} className={classes.header}>
        <Typography variant="h5">
          Search results for '{params.query}'
        </Typography>
      </Paper>
        <TrackList search={params.query} />
    </div>
  );
}

export default MusicSearchResult;
