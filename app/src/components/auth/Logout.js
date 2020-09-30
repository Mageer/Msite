import React from "react";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import CustomButton from "../misc/CustomButton";

function Logout() {
  const handleClick = () => {
    console.log("log out");
  };

  return (
    <CustomButton onClick={handleClick}>
      <ExitToAppIcon />
    </CustomButton>
  );
}

export default Logout;
