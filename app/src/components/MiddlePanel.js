import React from 'react';
import { Box, Paper } from '@material-ui/core';
import SearchTracks from './tracks/SearchTracks';
import TracksList from './tracks/TracksList';

function MiddlePanel() {
  return(
    <Box boxShadow={2} style={{ height: '100%' }}>
      <Paper square>
        <SearchTracks />
      </Paper>
      <div style={{ height: 'calc(100% - 72px)', overflowY: 'auto', backgroundColor: '#2A2A2A', padding: '10px',}}>
        <TracksList />
      </div>
  </Box>
  );
}

export default MiddlePanel;
