import React from "react";
import { makeStyles } from "@material-ui/styles";
import Lyrics from "../lyrics/Lyrics";
import "../../scrollbar.css";

const useStyles = makeStyles((theme) => ({
  lyrics: {
    height: "100%",
    background: theme.palette.background.levelThree,
  },
}));

function RightPanel() {
  const classes = useStyles();
  return (
    <div className={classes.lyrics}>
      <Lyrics />
    </div>
  );
}

export default RightPanel;
