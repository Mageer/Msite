import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { List, ListItem, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ScaleLoader from 'react-spinners/ScaleLoader';

const useStyles = makeStyles({
  root: {
    color: 'white',
    fontFamily: "Consolas, 'Courier New', monospace",
  },
  item: {
    '&:hover': {
      color: 'rgb(153, 255, 153, 0.5)',
    },
    '&:active': {
      color: 'rgb(153, 255, 153, 0.5)',
    },
    '&$selected' : {
      color: 'rgb(100, 255, 100, 0.8)',
      '&:hover': {
        color: 'rgb(100, 255, 100, 0.8)',
      },
    }
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
      classes={{root: classes.item, selected: classes.selected}}
      selected={track.id === currentTrackId}
      onClick={() => handleClick(track.id)}
    >
      <img src={track.albumArtUrl} alt='Album Art'/>
      {`--${track.artists[0]} - ${track.name}`} 
    </ListItem>
  ));


  return (
    <List height='400' className={classes.root}>
      {listItems}
    </List>
  );
}

export default TracksList;
