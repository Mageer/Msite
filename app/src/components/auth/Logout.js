import React from "react";
import { useDispatch } from "react-redux";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import CustomButton from "../misc/CustomButton";
import { logoutUser } from "../../actions/user";

function Logout() {
  const dispatch = useDispatch();

  const handleClick = () => {
    console.log("log out");
    dispatch(logoutUser());
  };

  return (
    <CustomButton onClick={handleClick}>
      <ExitToAppIcon />
    </CustomButton>
  );
}

export default Logout;
