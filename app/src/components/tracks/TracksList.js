import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import {
  Grid,
  Typography,
  List,
  ListItem,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import lime from '@material-ui/core/colors/lime';
import ScaleLoader from 'react-spinners/ScaleLoader';
import TrackListItem from './TrackListItem';

const useStyles = makeStyles({
  root: {
    color: '#D8D8D8',
    height: '100%'
  },
  item: {
    '&:hover': {
      color: lime[800],
    },
    '&$selected' : {
      color: lime[500],
    },
  },
  selected: {},
});

function TracksList() {
  const { isFetching, tracks } = useSelector((state) => state.searchTracks, shallowEqual);
  const accessToken = useSelector((state) => state.user.accessToken);
  const currentTrack = useSelector((state) => state.playbackStatus.currentTrack);
  const currentTrackId = currentTrack ? currentTrack.id : null;
  const classes = useStyles();

  if (!tracks) {
    return '';
  }

  if (isFetching) {
    return <ScaleLoader size={50} color={'#99ff99'} />;
  }

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

  const listItems = tracks.map((track, index) => (
    <ListItem
      button 
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


  return (
    <List className={classes.root}>
      {listItems}
    </List>
  );
}

export default TracksList;
