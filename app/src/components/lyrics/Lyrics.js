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
    wordWrap: 'break-word',
  },
});

function Lyrics() {
  const classes = useStyles();
  const { songName, lyrics, isFetching } = useSelector((state) => state.lyrics, shallowEqual);
  
  /**
   * Fetches lyrics, chaning isFetching to true, fetches again,
   * isFetching becomes false, rerenders and fetches again, loop.
   */
  const track = useSelector((state) => state.playbackStatus.currentTrack);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   if (track) {
  //     dispatch(fetchLyrics(track.name));
  //   }
  // }, [track, dispatch]);

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
