import React from "react";
import { useHistory } from "react-router-dom";
import { Card, CardActionArea, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import qs from "query-string";

const useStyles = makeStyles((theme) => ({
  cardContainer: {
    lineHeight: "0px",
  },
  image: {
    width: "100%",
    height: "auto",
  },
  text: {
    padding: "5px",
    textAlign: "center",
    color: "gray",
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
    <div>
      <Card square elevation={2} onClick={handleClick}>
        <CardActionArea className={classes.cardContainer}>
          <img
            src={playlist.imageUrl}
            className={classes.image}
            alt={"Playlist art cover"}
          />
        </CardActionArea>
      </Card>
      <Typography variant={"body1"} className={classes.text}>
        {playlist.name}
      </Typography>
    </div>
  );
}

export default PlaylistItem;
