import React from 'react';
import { Box, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import SearchTracks from './tracks/SearchTracks';
import TracksList from './tracks/TracksList';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  searchBar: {
  },
  tracksList: {
    flex: '1',
    overflowY: 'auto', 
    backgroundColor: '#2A2A2A', 
    padding: '10px',
  },
});

function MiddlePanel() {
  const classes = useStyles();
  return(
    <Box boxShadow={2} className={classes.root}>
      <Paper square>
        <SearchTracks />
      </Paper>
      <div className={classes.tracksList}>
        <TracksList />
      </div>
    </Box>
  );
}

export default MiddlePanel;
