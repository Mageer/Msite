import React from "react";
import { useSelector } from "react-redux";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import ScaleLoader from "react-spinners/ScaleLoader";
import "../../scrollbar.css";

const useStyles = makeStyles({
  outerContainer: {
    height: "100%",
    textAlign: "center",
    color: "#D8D8D8",
    wordWrap: "break-word",
    overflowY: "scroll",
  },
  lyricsContainer: {
    padding: "10px",
  },
  lyrics: {
    whiteSpace: "pre-wrap",
  },
});

const missingItem = { name: "", lyrics: "", isFetching: false };

function LyricsText() {
  const { currentLyricsId, items: lyricsItems } = useSelector(
    (state) => state.lyrics
  );
  const classes = useStyles();
  const { name, lyrics, isFetching } =
    lyricsItems[currentLyricsId] || missingItem;

  return (
    <div className={classes.outerContainer} id="scrollbar">
      <ScaleLoader size={50} color={"#0C49D8"} loading={isFetching} />

      <div className={classes.lyricsContainer}>
        <Typography variant="h6">{name}</Typography>
        <br />
        <Typography variant="body2">
          <span className={classes.lyrics}>{lyrics.trim()}</span>
        </Typography>
      </div>
    </div>
  );
}

export default LyricsText;
