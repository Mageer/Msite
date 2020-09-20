import React, { useState, useEffect } from "react";
import { useSelector, shallowEqual } from "react-redux";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Slider from "@material-ui/core/Slider";
import prettyMilliseconds from "pretty-ms";

const useStyles = makeStyles({
  root: {
    color: "white",
  },
  bar: {
    paddingTop: "4px",
  },
  position: {
    textAlign: "right",
    paddingRight: "10px",
  },
  duration: {
    textAlign: "left",
    paddingLeft: "10px",
  },
});

const msToTimeStamp = (time) => {
  let timeStamp = "0:00";
  if (time >= 1000) {
    timeStamp = prettyMilliseconds(time, {
      secondsDecimalDigits: 0,
      colonNotation: true,
    });
  }
  return <Typography variant={"body2"}>{timeStamp}</Typography>;
};

function SeekBar(props) {
  const classes = useStyles();
  const { getPosition, seek } = props;
  const { duration } = useSelector(
    (state) => state.playbackStatus,
    shallowEqual
  );
  const updateRate = 100;
  const maxVal = ~~(duration / updateRate); // Force int
  const [prog, setProg] = useState(0);
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      getPosition().then((position) => {
        setProg((p) => ~~(position / updateRate) % maxVal);
        setPosition((p) => position);
      });
    }, updateRate);
    return () => clearInterval(interval);
  });

  const onSeek = (event, value) => {
    seek((value / maxVal) * duration);
  };

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      flex-start="center"
      className={classes.root}
    >
      <Grid item xs={1} className={classes.position}>
        {msToTimeStamp(position)}
      </Grid>

      <Grid item xs={10} className={classes.bar}>
        <Slider value={prog} onChangeCommitted={onSeek} max={maxVal} />
      </Grid>

      <Grid item xs={1} className={classes.duration}>
        {msToTimeStamp(duration)}
      </Grid>
    </Grid>
  );
}

export default SeekBar;
