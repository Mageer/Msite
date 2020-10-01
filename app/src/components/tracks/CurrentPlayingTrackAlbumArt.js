import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  img: {
    width: "100%",
  },
});

function CurrentPlayingTrackAlbumArt() {
  const classes = useStyles();
  const track = useSelector((state) => state.playback.currentTrack);
  if (!track) {
    return <div></div>;
  }

  const albumArtUrl = track.album.images[0].url; // 64x64 px
  return <img src={albumArtUrl} alt="Album Art" className={classes.img} />;
}

export default CurrentPlayingTrackAlbumArt;
