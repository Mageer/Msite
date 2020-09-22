import React from 'react';
import { Box, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Lyrics from './lyrics/Lyrics';
import '../scrollbar.css';

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
    backgroundColor: '#0B0B0B',
  },
});

function RightPanel() {
  const classes = useStyles();
  return(
    <Box boxShadow={0} className={classes.root}>
      <div className={classes.lyrics} id='scrollbar'>
        <Lyrics />
      </div>
    </Box>
  );
}

export default RightPanel;
