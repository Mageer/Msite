import React from "react";
import { useHistory } from "react-router-dom";
import { Card, CardActionArea, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import qs from "query-string";

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
  const history = useHistory();
  const { playlist } = props;

  const handleClick = (id) => {
    const search = qs.stringify({ id });
    const pathname = "/playlist";
    history.push({ pathname, search });
  };

  return (
    <Card className={classes.container} square elevation={2}>
      <CardActionArea onClick={() => handleClick(playlist.id)}>
        <img src={playlist.imageUrl} className={classes.image} alt={"Playlist art cover"}/>
        <Typography variant={"body1"} className={classes.text}>
          {playlist.name}
        </Typography>
      </CardActionArea>
    </Card>
  );
}

export default PlaylistItem;
