import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import PlaylistItem from './PlaylistItem';
import InfiniteScroll from "react-infinite-scroller";

const useStyles = makeStyles({
  playlistsContainer: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
  },
  playlistItem: {
    padding: '25px',
    width: '150px',
    height: 'auto',
  },
});

function PlaylistsList() {
  const classes = useStyles();
  const playlistsRawData = useSelector((state) => state.userPlaylists.items);
  const playlistsForDisplay = playlistsRawData.map((playlist) => (
    <PlaylistItem playlist={playlist} />
  ));

  const loadFunc = () => true;

  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={loadFunc}
      hasMore={false}
      useWindow={false}
    >
    <div className={classes.playlistsContainer}>
    {playlistsForDisplay.map((playlist) => <div className={classes.playlistItem}>{playlist}</div>)} 
    </div>
    </InfiniteScroll>
  );
}

export default PlaylistsList;
