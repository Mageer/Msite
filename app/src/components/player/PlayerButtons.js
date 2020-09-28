import React from "react";
import { makeStyles } from "@material-ui/styles";
import PreviousButton from "./PreviousButton";
import PlayButton from "./PlayButton";
import NextButton from "./NextButton";

const useStyles = makeStyles({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  innerPadding: {
    paddingLeft: "20px",
    paddingRight: "20px",
  },
});

function PlayerButtons(props) {
  const { previousTrack, resume, pause, nextTrack } = props;
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <PreviousButton onClick={previousTrack} />
      <div className={classes.innerPadding}>
        <PlayButton resume={resume} pause={pause} />
      </div>
      <NextButton onClick={nextTrack} />
    </div>
  );
}

export default PlayerButtons;
