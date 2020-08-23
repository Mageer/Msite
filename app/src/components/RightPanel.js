import React from 'react';
import { Box, Paper } from '@material-ui/core';
import SearchLyrics from './lyrics/SearchLyrics';
import Lyrics from './lyrics/Lyrics';

function RightPanel() {
  return(
    <Box boxShadow={2} style={{height: '100%' }}>
      <Paper square style={{ height:'52px' }}>
        <SearchLyrics />
      </Paper>
      <Box style={{ height: 'calc(100% - 52px)', backgroundColor: '#323232' }}>
        <Lyrics />
      </Box>
    </Box>
  );
}

export default RightPanel;
