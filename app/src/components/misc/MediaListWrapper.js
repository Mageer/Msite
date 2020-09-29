import React from "react";
import { Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme, props) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  header: {
    textAlign: "center",
    padding: "10px",
    background: (props) =>
      props.headerColor || theme.palette.background.levelTwo,
  },
  list: {
    height: "100%",
  },
}));

function MediaListWrapper(props) {
  const { headerText, headerColor, children: list } = props;
  const classes = useStyles({ headerColor });

  return (
    <div className={classes.container}>
      <Paper square elevation={2} className={classes.header}>
        <Typography variant="h5">{headerText}</Typography>
      </Paper>
      {list}
    </div>
  );
}

export default MediaListWrapper;
