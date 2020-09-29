import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme, props) => ({
  container: {
    lineHeight: "0px",
  },
  button: {
    fontSize: (props) => props.size,
    "&:hover": {
      color: "white",
      cursor: "pointer",
    },
    "&:active": {
      cursor: "pointer",
    },
  },
}));

function CustomButton(props) {
  const { large, onClick, children: icon } = props;
  const size = large ? "50px" : "30px";
  const classes = useStyles({ size });
  const styledIcon = React.cloneElement(
    icon,
    { className: classes.button },
    null
  );

  return (
    <div className={classes.container} onClick={onClick}>
      {styledIcon}
    </div>
  );
}

export default CustomButton;
