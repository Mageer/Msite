import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import { css } from "@emotion/core";

// Spinner styling not clear
const override = css`
  display: block;
  margin: 0 auto;
  width: 100%;
  height: 100%;
`;

const useStyles = makeStyles({
  container: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  loader: {
    height: "300px",
    width: "300px",
  },
  text: {
    color: "gray",
  },
});

function LoadingScreen() {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.loader}>
        <ClimbingBoxLoader css={override} size={30} color={"white"} />
      </div>

      <div className={classes.text}>
        <Typography variant="h5">Please wait...</Typography>
      </div>
    </div>
  );
}

export default LoadingScreen;
