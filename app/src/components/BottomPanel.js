import React from "react";
import { Paper, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import PlayerControls from "./player/PlayerControls";
import VolumeControl from "./player/VolumeControl";
import Devices from "./Devices";

const useStyles = makeStyles({
  root: {
    padding: "5px",
    background: "#3A3A3A",
  },
  volumeAndDevicesContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  devices: {
    textAlign: "right",
    paddingRight: "10px",
  },
  volumeControl: {
    width: "100px",
    paddingRight: "20px",
  },
});

function BottomPanel(props) {
  const { player } = props;
  const classes = useStyles();
  console.log(player);

  console.log("Bottom rendered");
  if (!player) {
    return <div></div>;
  }

  return (
    <Paper elevation={2} square className={classes.root}>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={10}>
          <PlayerControls player={player} />
        </Grid>

        <Grid item xs={2}>
          <div className={classes.volumeAndDevicesContainer}>
            <div className={classes.devices}>
              <Devices />
            </div>
            <div className={classes.volumeControl}>
              <VolumeControl setVolume={(volume) => player.setVolume(volume)} />
            </div>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default BottomPanel;
