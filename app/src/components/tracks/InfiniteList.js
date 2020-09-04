import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { List, ListSubheader, ListItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import blue from '@material-ui/core/colors/blue';
import InfiniteScroll from 'react-infinite-scroller';
import TrackListItem from './TrackListItem';

const useStyles = makeStyles({
  root: {
    color: '#D8D8D8',
    backgroundColor: '#151515',
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
  sticky: {
    backgroundColor: 'black',
    padding: '0px',
    margin: '0px',
  },
});

const fetchMoreTracks = (accessToken, baseApiPathname, limit, offset) => {
  const bearer = `Bearer ${accessToken}`;
  const options = {
    method: 'GET',
    headers: {
      Authorization: bearer,
    },
  };
  return fetch(`${baseApiPathname}&limit=${encodeURI(limit)}&offset=${encodeURI(offset)}`, options)
    .then((res) => res.json())
}

function InfiniteList(props) {
  const { baseApiPathname } = props;
  const dispatch = useDispatch();
  const classes = useStyles();
  const accessToken = useSelector((state) => state.user.accessToken);
  const currentTrack = useSelector((state) => state.playbackStatus.currentTrack);
  const currentTrackId = currentTrack ? currentTrack.id : null;
  const [items, setItems] = useState([]);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [offset, setOffset] = useState(0);
  const limit = 50;

  const handleClick = (id) => {
    const bearer = `Bearer ${accessToken}`;
    const options = {
      method: 'POST',
      headers: {
        Authorization: bearer,
      },
    };
    return fetch(`/spotify/play-track?uri=${encodeURI(id)}`, options)
      .then((res) => {
        if (!res.ok){
          throw new Error('something went wrong');
        }
        return res.json();
      })
      .catch((err) => console.log(err));
  };

  const loadFunc = async () => {
    await fetchMoreTracks(accessToken, baseApiPathname, limit, offset)
      .then((tracks) => {
        if (tracks && tracks.length) {
          setOffset((offset) => offset + limit);
          setItems((items) => [...items, ...tracks]);
        } else {
          setHasMoreItems(false);
        }
      });
  }

  const listItems = items.map((track, index) => (
    <ListItem
      button
      divider 
      key={index}
      classes={{ root: classes.item, selected: classes.selected }}
      selected={track.id === currentTrackId}
      onClick={() => handleClick(track.id)}
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
    <div style={{height: '100%', overflow: 'auto'}}>
    <InfiniteScroll
      pageStart={0}
      loadMore={loadFunc}
      hasMore={hasMoreItems}
      loader={<div className="loader" key={0}>Loading ...</div>}
      useWindow={false}
    >
      <List className={classes.root}>
        {listItems}
      </List>

    </InfiniteScroll>
    </div>
  );
}

export default InfiniteList;
