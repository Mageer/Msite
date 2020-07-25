import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import ScaleLoader from 'react-spinners/ScaleLoader';
// import LyricsSearchForm from './LyricsSearchForm';
import CurrentPlayingTrack from '../tracks/CurrentPlayingTrack';

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
    height: '450px',
    overflowY: 'auto',
    wordWrap: 'break-word',
  },
});

function Lyrics() {
  const { songName, lyrics, isFetching } = useSelector((state) => state.lyrics, shallowEqual);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* <LyricsSearchForm /> */}
      <CurrentPlayingTrack />
      <Box>
      <pre className={classes.lyrics}>
      
        <ScaleLoader size={50} color={'#99ff99'} loading={isFetching} />
        <h2>{songName}</h2>
        <p>{lyrics}</p>
      </pre>
      </Box>
    </div>
  );
}

export default Lyrics;
