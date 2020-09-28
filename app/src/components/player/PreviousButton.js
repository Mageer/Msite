import React from "react";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import CustomButton from "../CustomButton";

function NextButton(props) {
  const { onClick } = props;
  return (
    <CustomButton onClick={onClick}>
      <SkipPreviousIcon />
    </CustomButton>
  );
}

export default NextButton;
