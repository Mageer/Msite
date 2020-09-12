import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { fetchLyrics } from '../../actions/lyrics';
import LyricsText from './LyricsText';
import '../../scrollbar.css';

const useStyles = makeStyles({
  root: {
    textAlign: 'center',
    color: '#D8D8D8',
    wordWrap: 'break-word',
    height: '100%',
    margin: '10px',
  },
  lyrics: {
    whiteSpace: 'pre-wrap',
  },
});

const trackEqual = (newTrack, oldTrack) => {
  if (newTrack && oldTrack) {
    return newTrack.id === oldTrack.id;
  }
  return (!newTrack && !oldTrack);
};

// Remove text inside () and after -
const trimSearchText = (text) => text.replace(/ *\([^)]*\)*/g, '').replace(/-.*$/,"");

function Lyrics() {
  const classes = useStyles();

  const track = useSelector((state) => state.playbackStatus.currentTrack, trackEqual);
  const dispatch = useDispatch();
  useEffect(() => {
    if (track) {
      const trimmedName = trimSearchText(track.name);
      const searchQuery = `${track.artists[0].name} ${trimmedName}`;
      dispatch(fetchLyrics(searchQuery));
    }
  }, [track, dispatch]);

  return (
    <div className={classes.root}>
      <LyricsText />
    </div>
  );
}

export default Lyrics;
