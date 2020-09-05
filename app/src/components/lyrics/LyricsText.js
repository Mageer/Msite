import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import ScaleLoader from 'react-spinners/ScaleLoader';

const useStyles = makeStyles({
  lyrics: {
    whiteSpace: 'pre-wrap',
  },
});

function LyricsText() {
  const { songName, lyrics, isFetching } = useSelector((state) => state.lyrics, shallowEqual);
  const classes = useStyles();
  
  return(
    <div>
      <ScaleLoader size={50} color={'#99ff99'} loading={isFetching} />
      <Typography variant="body2">
        <span className={classes.lyrics}>
          {lyrics.trim()}
        </span>
      </Typography>
    </div>
  );
}

export default LyricsText;
