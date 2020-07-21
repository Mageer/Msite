import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { List, ListItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ScaleLoader from 'react-spinners/ScaleLoader';

const useStyles = makeStyles({
  root: {
    color: 'white',
    fontFamily: "Consolas, 'Courier New', monospace",
  },
  item: {
    '&:hover': {
      backgroundColor: 'rgb(153, 255, 153, 0.1)',
    },
    '&:active': {
      backgroundColor: 'rgb(153, 255, 153, 0.5)',
    },
  },
});

function TracksList() {
  const { isFetching, tracks } = useSelector((state) => state.searchTracks, shallowEqual);
  const { accessToken } = useSelector((state) => state.loginUser, shallowEqual);
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
    console.log(`/spotify/play-track?uri=${encodeURI(id)}`);
    return fetch(`/spotify/play-track?uri=${encodeURI(id)}`, options)
      .then((res) => res.json())
      .then((res) => console.log(res));
  };

  return (
    <List height='400' className={classes.root}>
      {tracks.map((track, index) => (
        <ListItem
          button 
          key={index}
          className={classes.item}
          onClick={() => handleClick(track.id)}
        >
          {`${track.artists[0]} - ${track.name}`} 
        </ListItem>
      ))}
    </List>
  );
}

export default TracksList;
