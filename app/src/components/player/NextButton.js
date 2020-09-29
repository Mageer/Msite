import React from "react";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import CustomButton from "../misc/CustomButton";

function NextButton(props) {
  const { onClick } = props;
  return (
    <CustomButton onClick={onClick}>
      <SkipNextIcon />
    </CustomButton>
  );
}

export default NextButton;
