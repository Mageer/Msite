import React, { useState } from "react";
import Slider from "@material-ui/core/Slider";
import { makeStyles } from "@material-ui/styles";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import VolumeOffIcon from "@material-ui/icons/VolumeOff";
import CustomButton from "../misc/CustomButton";

const useStyles = makeStyles({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
});

function VolumeControl(props) {
  const { setVolume } = props;
  const classes = useStyles();
  const [sliderValue, setSliderValue] = useState(100);
  const [muted, setMuted] = useState(false);

  const volumeIcon = () => {
    if (muted || sliderValue === 0) {
      return (
        <CustomButton
          onClick={() => {
            setMuted(false);
            setVolume(sliderValue / 100);
          }}
        >
          <VolumeOffIcon />
        </CustomButton>
      );
    }
    return (
      <CustomButton
        onClick={() => {
          setMuted(true);
          setVolume(0);
        }}
      >
        <VolumeUpIcon />
      </CustomButton>
    );
  };

  const onSeek = (event, value) => {
    setSliderValue(value);
    setVolume(value / 100);
  };

  return (
    <div className={classes.container}>
      <div>{volumeIcon()}</div>
      <Slider
        defaultValue={100}
        disabled={muted}
        onChange={onSeek}
        style={{
          maxWidth: "120px",
        }}
      />
    </div>
  );
}

export default VolumeControl;
