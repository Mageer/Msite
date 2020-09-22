import React from "react";
import { Card, CardActionArea, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "#484848",
  },
  image: {
    width: "100%",
    height: "auto",
  },
  text: {
    padding: "5px",
    textAlign: "center",
  },
}));

function PlaylistItem(props) {
  const classes = useStyles();
  const { playlist } = props;

  const handleClick = () => console.log(playlist.id);

  return (
    <Card className={classes.container} square elevation={2}>
      <CardActionArea onClick={handleClick}>
        <img src={playlist.imageUrl} className={classes.image} />
        <Typography variant={"body1"} className={classes.text}>
          {playlist.name}
        </Typography>
      </CardActionArea>
    </Card>
  );
}

export default PlaylistItem;
