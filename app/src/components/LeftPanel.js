import React from 'react';
import { Paper } from '@material-ui/core';
import CurrentPlayingTrackAlbumArt from './tracks/CurrentPlayingTrackAlbumArt';

function LeftPanel() {
  return(
    <Paper elevation={2} square style={{ height: '100%', }}>
      <CurrentPlayingTrackAlbumArt />
    </Paper>
  );
}

export default LeftPanel;
