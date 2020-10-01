import React from "react";
import { useSelector } from "react-redux";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  information: {
    paddingLeft: "10px",
  },
  fieldDescription: {
    color: "gray",
  },
});

function CurrentPlayingTrackInformation() {
  const track = useSelector((state) => state.playback.currentTrack);
  const classes = useStyles();

  if (!track) {
    return <div></div>;
  }

  const description = (name) => (
    <Typography variant="body2" className={classes.fieldDescription}>
      {`${name}:`}
    </Typography>
  );

  const name = track.name;
  const artists = track.artists.map((artist) => artist.name).join(", ");
  const album = track.album.name;
  return (
    <div>
      {description("Name")}
      <Typography variant="h6" className={classes.information}>
        {name}
      </Typography>
      <br />
      {description("Artists")}
      <Typography variant="body1" className={classes.information}>
        {artists}
      </Typography>
      <br />
      {description("Album")}
      <Typography variant="body1" className={classes.information}>
        {album}
      </Typography>
      <br />
      {description("Year")}
      <Typography variant="body1" className={classes.information}>
        Coming soon...
      </Typography>
      <br />
      {description("Popularity")}
      <Typography variant="body1" className={classes.information}>
        Coming soon...
      </Typography>
    </div>
  );
}

export default CurrentPlayingTrackInformation;
