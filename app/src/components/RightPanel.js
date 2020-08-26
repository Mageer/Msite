import React from 'react';
import { Box, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import SearchLyrics from './lyrics/SearchLyrics';
import Lyrics from './lyrics/Lyrics';

const useStyles = makeStyles({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  searchBar: {
  },
  lyrics: {
    flex: '1',
    overflowY: 'scroll',
    backgroundColor: '#323232',
  },
});

function RightPanel() {
  const classes = useStyles();
  return(
    <Box boxShadow={2} className={classes.root}>
      <Paper square className={classes.searchBar}>
        <SearchLyrics />
      </Paper>
      <div className={classes.lyrics}>
        <Lyrics />
      </div>
    </Box>
  );
}

export default RightPanel;
