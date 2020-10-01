import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import CustomButton from "../misc/CustomButton";
import { logoutUser } from "../../actions/user";

const useStyles = makeStyles({
  name: {
    paddingRight: "5px",
    paddingTop: "3px",
  },
});

function Logout() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.username);
  const name = username.replace("spotify_", "");

  const handleClick = () => dispatch(logoutUser());

  return (
    <>
      <Typography className={classes.name}>{name}</Typography>
      <CustomButton onClick={handleClick}>
        <ExitToAppIcon />
      </CustomButton>
    </>
  );
}

export default Logout;
