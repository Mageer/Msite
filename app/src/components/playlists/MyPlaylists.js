import React from "react";
import { useSelector } from "react-redux";
import { Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PlaylistsList from "./PlaylistsList";

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
  playlists: {
    height: "100%",
  },
});

function MyPlaylists() {
  const classes = useStyles();
  const playlists = useSelector((state) => state.userPlaylists.items);

  return (
    <div className={classes.container}>
      <Paper square elevation={2} className={classes.header}>
        <Typography variant="h5">My playlists</Typography>
      </Paper>
      <PlaylistsList
        loadMore={() => true}
        isExhausted={true}
        isFetching={false}
      >
        {playlists}
      </PlaylistsList>
    </div>
  );
}

export default MyPlaylists;
