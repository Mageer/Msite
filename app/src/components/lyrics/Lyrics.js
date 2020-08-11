import React, { useEffect } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import ScaleLoader from 'react-spinners/ScaleLoader';
import LyricsSearchForm from './LyricsSearchForm';
import { fetchLyrics } from '../../actions/lyrics';

const useStyles = makeStyles({
  root: {
    textAlign: 'center',
    borderstyle: 'solid',
    borderWidth: '1px',
    borderColor: 'orange',
  },
  lyrics: {
    padding: '50px',
    color: 'white',
    textAlign: 'left',
    fontFamily: "Consolas, 'Courier New', monospace",
    fontSize: 'small',
    height: '450px',
    overflowY: 'auto',
    overflowX: 'none',
    wordWrap: 'break-word',
  },
});

const trackEqual = (newTrack, oldTrack) => {
  if (newTrack && oldTrack) {
    return newTrack.id === oldTrack.id;
  }
  return (!newTrack && !oldTrack);
};

function Lyrics() {
  const classes = useStyles();
  const { songName, lyrics, isFetching } = useSelector((state) => state.lyrics, shallowEqual);

  /**
   * FIX:
   * useEffect runs even when track doesn't change because it doesn't understand
   * that things haven't changed on rerender.
   */
  const track = useSelector((state) => state.playbackStatus.currentTrack, trackEqual);
  const dispatch = useDispatch();
  useEffect(() => {
    if (track) {
      const searchQuery = `${track.name} ${track.artists[0].name}`;
      dispatch(fetchLyrics(searchQuery));
    }
  }, [track, dispatch]);

  return (
    <div className={classes.root}>
      <Box>
      <pre className={classes.lyrics}>
        <ScaleLoader size={50} color={'#99ff99'} loading={isFetching} />
        <h2>{songName}</h2>
        <p>{lyrics}</p>
      </pre>
      </Box>
      <LyricsSearchForm />
    </div>
  );
}

export default Lyrics;
