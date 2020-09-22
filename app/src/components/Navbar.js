import React from "react";
import { ButtonGroup, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MusicSearch from "./musicSearch/MusicSearch";
import LyricsSearch from "./lyrics/LyricsSearch";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";
import NewReleasesIcon from "@material-ui/icons/NewReleases";

const useStyles = makeStyles({
  root: {
    padding: "5px",
    background: "#3A3A3A",
  },
});

function Navbar() {
  const classes = useStyles();
  const history = useHistory();
  const handleMyPlaylists = () => history.push({ pathname: "/my-playlists" });

  const handleSearch = () => history.push({ pathname: "/search" });

  const handleLikedSongs = () => history.push({ pathname: "/liked-songs" });

  return (
    <div className={classes.root}>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
        spacing={0}
      >
        <Grid item xs={2}>
          <MusicSearch />
        </Grid>

        <Grid item xs={7}>
          <ButtonGroup variant="text" size="large">
            <Button onClick={handleLikedSongs}>
              <FavoriteIcon />
              Liked songs
            </Button>
            <Button onClick={handleMyPlaylists}>
              <PlaylistPlayIcon />
              My playlists
            </Button>
            <Button disabled>
              <NewReleasesIcon />
              Featured
            </Button>
          </ButtonGroup>
        </Grid>

        <Grid item xs={3}>
          <LyricsSearch />
        </Grid>
      </Grid>
    </div>
  );
}

export default Navbar;
