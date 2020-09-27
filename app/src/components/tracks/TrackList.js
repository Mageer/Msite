import React from "react";
import { useSelector } from "react-redux";
import { List, ListItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import blue from "@material-ui/core/colors/blue";
import InfiniteScroll from "react-infinite-scroller";
import TrackListItem from "../tracks/TrackListItem";
import getTrackIdAndLinkedFromId from "../../lib/trackIdAndLinkedFromId";
import "../../scrollbar.css";

const useStyles = makeStyles({
  root: {
    height: "100%",
    overflow: "auto",
  },
  list: {
    color: "#D8D8D8",
    height: "100%",
  },
  item: {
    "&:hover": {
      color: blue[500],
    },
    "&$selected": {
      color: blue[500],
    },
  },
  selected: {},
  loader: {
    textAlign: "center",
    padding: "5px",
  },
});

function TrackList(props) {
  const classes = useStyles();
  const {
    loadMore,
    onClick,
    useOffset,
    isExhausted,
    isFetching,
    children: items,
  } = props;

  const currentTrack = useSelector(
    (state) => state.playbackStatus.currentTrack
  );
  const {
    currentTrackId,
    currentTrackLinkedFromId,
  } = getTrackIdAndLinkedFromId(currentTrack);

  const handleClick = (id, index) => {
    if (useOffset) {
      onClick(index);
    } else {
      onClick(id);
    }
  };

  const listItems = items.map((track, index) => (
    <ListItem
      button
      divider
      key={index}
      classes={{ root: classes.item, selected: classes.selected }}
      selected={
        track.id === currentTrackId || track.id === currentTrackLinkedFromId
      }
      onClick={() => handleClick(track.id, index)}
    >
      <TrackListItem
        albumArtUrl={track.albumArtUrl}
        name={track.name}
        artists={track.artists}
        duration={track.duration}
      />
    </ListItem>
  ));

  return (
    <div className={classes.root} id="scrollbar">
      <InfiniteScroll
        pageStart={0}
        loadMore={loadMore}
        hasMore={!isExhausted && !isFetching}
        useWindow={false}
      >
        <List className={classes.list}>{listItems}</List>
        <div className={classes.loader}>{isFetching ? "loading" : null}</div>
      </InfiniteScroll>
    </div>
  );
}

export default TrackList;
