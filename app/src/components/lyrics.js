import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import ScaleLoader from 'react-spinners/ScaleLoader';
import LyricsSearchForm from './LyricsSearchForm';
import CurrentPlayingTrack from './CurrentPlayingTrack';

const useStyles = makeStyles({
  root: {
    textAlign: 'center',
    borderStyle: 'solid',
    borderColor: 'green',
    borderWidth: '2px',
  },
  lyrics: {
    padding: '50px',
    borderStyle: 'solid',
    borderColor: 'red',
    borderWidth: '2px',
    color: 'white',
    textAlign: 'left',
    fontFamily: "Consolas, 'Courier New', monospace",
  },
});

function Lyrics() {
  const { songName, lyrics, isFetching } = useSelector((state) => state.lyrics, shallowEqual);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <LyricsSearchForm />
      <CurrentPlayingTrack />
      <pre className={classes.lyrics}>
        <h2>{songName}</h2>
        <p>{lyrics}</p>
      </pre>
      <ScaleLoader size={50} color={'#99ff99'} loading={isFetching} />
    </div>
  );
}

export default Lyrics;
