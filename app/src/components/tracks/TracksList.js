import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { Grid, List, ListItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ScaleLoader from 'react-spinners/ScaleLoader';
import prettyMilliseconds from 'pretty-ms';

const useStyles = makeStyles({
  root: {
    color: '#D8D8D8',
    fontFamily: "Consolas, 'Courier New', monospace",
    height: '100%'
  },
  item: {
    fontFamily: "Consolas, 'Courier New', monospace",
    fontSize: 'small',
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
  albumArt: {
    height: '32px',
    width: '32px',
  }
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
      <Grid container>
        <Grid item xs={1}>
          <img src={track.albumArtUrl} alt='Album Art' className={classes.albumArt}/>
        </Grid>
        <Grid item xs={5}>
          {track.name}
        </Grid>
        <Grid item xs={4}>
          {track.artists[0]}
        </Grid>
        <Grid item xs={2}>
          {prettyMilliseconds(track.duration, {
            secondsDecimalDigits: 0,
            colonNotation: true,
            })
          }
        </Grid>
      </Grid>
    </ListItem>
  ));


  return (
    <List className={classes.root}>
      {listItems}
    </List>
  );
}

export default TracksList;
