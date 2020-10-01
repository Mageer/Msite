import React from "react";
import PlayArrow from "@material-ui/icons/PlayArrow";
import Pause from "@material-ui/icons/Pause";
import { useSelector } from "react-redux";
import CustomButton from "../misc/CustomButton";

function PlayButton(props) {
  const { resume, pause } = props;
  const paused = useSelector((state) => state.playback.paused);

  if (paused) {
    return (
      <CustomButton onClick={() => resume()}>
        <PlayArrow />
      </CustomButton>
    );
  }
  return (
    <CustomButton onClick={() => pause()}>
      <Pause />
    </CustomButton>
  );
}

export default PlayButton;
