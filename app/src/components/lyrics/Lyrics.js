import React, { useEffect } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Paper, Typography } from '@material-ui/core';
import ScaleLoader from 'react-spinners/ScaleLoader';
import { fetchLyrics } from '../../actions/lyrics';

const useStyles = makeStyles({
  root: {
    textAlign: 'center',
    color: '#D8D8D8',
    wordWrap: 'break-word',
    height: '100%',
    overflowY: 'auto',
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
      const searchQuery = `${track.artists[0].name} ${track.name}`;
      dispatch(fetchLyrics(searchQuery));
    }
  }, [track, dispatch]);

  return (
    <Box className={classes.root}>
        <ScaleLoader size={50} color={'#99ff99'} loading={isFetching} />
        <Typography variant="body2">
          <span style={{ whiteSpace: 'pre-wrap' }}>
            {lyrics}
          </span>
        </Typography>
    </Box>
  );
}

export default Lyrics;
