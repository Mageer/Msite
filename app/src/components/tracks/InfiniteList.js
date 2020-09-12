import React, { useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { List, ListSubheader, ListItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import blue from '@material-ui/core/colors/blue';
import InfiniteScroll from 'react-infinite-scroller';
import TrackListItem from './TrackListItem';
import {
  resetTrackList,
  fetchSearchedTracks,
  fetchPlaylistTracks
} from '../../actions/tracks';
import '../../scrollbar.css';

const useStyles = makeStyles({
  root: {
    height: '100%',
    overflow: 'auto',
  },
  list: {
    color: '#D8D8D8',
    height: '100%',
  },
  item: {
    '&:hover': {
      color: blue[500],
    },
    '&$selected' : {
      color: blue[500],
    },
  },
  selected: {
  },
  loader: {
    textAlign: 'center',
    padding: '5px',
  },
});

function InfiniteList(props) {
  const { search, playlistId } = props;
  const dispatch = useDispatch();
  const classes = useStyles();

  const accessToken = useSelector((state) => state.user.accessToken);
  const { list: items, isFetching, endOfList } = useSelector((state) => state.tracks, shallowEqual);
  const currentTrack = useSelector((state) => state.playbackStatus.currentTrack);
  const currentTrackId = currentTrack ? currentTrack.id : null;
  const currentTrackLinkedFromId = currentTrack ? currentTrack.linked_from_uri.replace('spotify:track:', '') : null;
  const limit = 50;

  const handleClick = (id, key) => {
    const options = {method: 'POST', headers: { Authorization: `Bearer ${accessToken}`}};
    if (search) {
      return fetch(`/spotify/play-track?uri=${encodeURI(id)}`, options);
    }
    if (playlistId) {
      return fetch(`/spotify/play-playlist?uri=${encodeURI(playlistId)}&offset=${encodeURI(key)}`, options);
    }
  };

  const loadFunc = () => {
    const offset = items.length;
    if (search) {
      return dispatch(fetchSearchedTracks(search, limit, offset));
    }
    if (playlistId){
      return dispatch(fetchPlaylistTracks(playlistId, limit, offset));
    }
  }

  const listItems = items.map((track, index) => (
    <ListItem
      button
      divider 
      key={index}
      classes={{ root: classes.item, selected: classes.selected }}
      selected={track.id === currentTrackId || track.id === currentTrackLinkedFromId}
      onClick={() => handleClick(track.id, index)}
    >
      <TrackListItem
        albumArtUrl={track.albumArtUrl}
        name={track.name}
        artists={track.artists[0]}
        duration={track.duration}
      />
    </ListItem>
  ));
  
  return(
    <div className={classes.root} id='scrollbar'>
    <InfiniteScroll
      pageStart={0}
      loadMore={loadFunc}
      hasMore={!endOfList && !isFetching}
      useWindow={false}
    >
      <List className={classes.list}>
        {listItems}
      </List>

      <div className={classes.loader}>{isFetching ? 'loading' : null}</div>

    </InfiniteScroll>
    </div>
  );
}

export default InfiniteList;
