import React from "react";
import SeekBar from "./SeekBar";
import PlayerButtons from "./PlayerButtons";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  playerButtons: {
    paddingLeft: '20px',
  },
  seekBar: {
    flexGrow: "1",
  },
});

function PlayerControls(props) {
  const classes = useStyles();
  const { player } = props;

  const getPosition = () =>
    player.getCurrentState().then((state) => {
      if (!state) {
        return 0;
      }
      return state.position;
    });

  return (
    <div className={classes.container}>
      <div className={classes.playerButtons}>
        <PlayerButtons
          previousTrack={() => player.previousTrack()}
          resume={() => player.resume()}
          pause={() => player.pause()}
          nextTrack={() => player.nextTrack()}
        />
      </div>
      <div className={classes.seekBar}>
        <SeekBar getPosition={getPosition} seek={(ms) => player.seek(ms)} />
      </div>
    </div>
  );
}

export default PlayerControls;
