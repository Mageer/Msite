import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Navbar from "./panels/TopPanel";
import LeftPanel from "./panels/LeftPanel";
import MiddlePanel from "./panels/MiddlePanel";
import RightPanel from "./panels/RightPanel";
import BottomPanel from "./panels/BottomPanel";
import LoadingScreen from "./misc/LoadingScreen";
import useSpotifyPlayer from "./player/useSpotifyPlayer";

const useStyles = makeStyles({
  root: {
    height: "100%",
    paddingBottom: "50px",
    display: "flex",
    flexDirection: "column",
  },
  middlePanel: {
    flex: "1",
    minHeight: "0",
  },
  topPanelItem: {
    height: "100%",
  },
  bottomPanel: {
    flex: "none",
  },
});

function Home() {
  const classes = useStyles();
  const loggedIn = useSelector((state) => state.user.loggedIn);
  const loaded = useSelector((state) => state.initialLoad.loaded);
  const player = useSpotifyPlayer();

  if (!loggedIn) {
    return <Redirect to="/" />;
  }
  if (!loaded) {
    return <LoadingScreen />;
  }

  return (
    <div className={classes.root}>
      <Navbar />
      <div className={classes.middlePanel}>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="flex-start"
          flex-start="center"
          spacing={0}
          className={classes.topPanelItem}
        >
          <Grid item xs={2} className={classes.topPanelItem}>
            <LeftPanel />
          </Grid>
          <Grid item xs={7} className={classes.topPanelItem}>
            <MiddlePanel />
          </Grid>
          <Grid item xs={3} className={classes.topPanelItem}>
            <RightPanel />
          </Grid>
        </Grid>
      </div>
      <div className={classes.bottomPanel}>
        <BottomPanel player={player} />
      </div>
    </div>
  );
}

export default Home;
