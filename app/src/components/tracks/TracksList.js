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
  const accessToken = useSelector((state) => state.user.accessToken);
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
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const listItems = tracks.map((track, index) => (
    <ListItem
      button 
      key={index}
      className={classes.item}
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
