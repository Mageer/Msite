import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PlaylistItem from "./PlaylistItem";
import InfiniteScroll from "react-infinite-scroller";
import "../../scrollbar.css";

const useStyles = makeStyles({
  root: {
    height: "100%",
    overflow: "auto",
  },
  playlistsContainer: {
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "center",
    height: "100%",
    overflow: "auto",
  },
  playlistItem: {
    padding: "25px",
    width: "150px",
    height: "auto",
  },
});

function PlaylistsList(props) {
  const classes = useStyles();
  const { loadMore, isExhausted, isFetching, children: playlists } = props;

  return (
    <div className={classes.root} id="scrollbar">
      <InfiniteScroll
        pageStart={0}
        loadMore={loadMore}
        hasMore={!isExhausted && !isFetching}
        useWindow={false}
      >
        <div className={classes.playlistsContainer}>
          {playlists.map((playlist) => (
            <div className={classes.playlistItem} key={playlist.id}>
              <PlaylistItem playlist={playlist} />
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}

export default PlaylistsList;
