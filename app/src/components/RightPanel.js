import React from "react";
import { makeStyles } from "@material-ui/styles";
import Lyrics from "./lyrics/Lyrics";
import "../scrollbar.css";

const useStyles = makeStyles({
  lyrics: {
    backgroundColor: "#0B0B0B",
    height: "100%",
  },
});

function RightPanel() {
  const classes = useStyles();
  return (
    <div className={classes.lyrics}>
      <Lyrics />
    </div>
  );
}

export default RightPanel;
