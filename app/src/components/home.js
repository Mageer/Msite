import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Grid, Box, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Lyrics from './lyrics/Lyrics';
import SearchTracks from './tracks/SearchTracks';
import SearchLyrics from './lyrics/SearchLyrics';
import TracksList from './tracks/TracksList';
import CurrentPlayingTrackAlbumArt from './tracks/CurrentPlayingTrackAlbumArt.js';
import BottomPanel from './BottomPanel';
import useNewAccessToken from './auth/useNewAccessToken';

const useStyles = makeStyles({
  inner: {
  },
});

function Home() {
  const loggedIn = useSelector((state) => state.user.loggedIn);
  const classes = useStyles();
  useNewAccessToken();

  if (!loggedIn) {
    return <Redirect to='/' />;
  }

  return (
    <Grid container
      direction="row"
      justify="center"
      alignItems="flex-start"
      flex-start="center"
      spacing={1}
      height={100}
    >

      <Grid item xs={2}>
        <Paper style={{ height: '652px'}} elevation={2} square>
          <CurrentPlayingTrackAlbumArt />
        </Paper>
      </Grid>

      <Grid item xs={10}>
        <Grid container spacing={1}>
          
          <Grid item xs={8}>
          <Box boxShadow={2}>
            <Paper square>
              <SearchTracks />
            </Paper>
            <div style={{ height: '580px', backgroundColor: '#2A2A2A', padding: '10px',}}>
              <Box style={{ height: '100%', overflowY: 'auto'}}>
                <TracksList />
              </Box>
            </div>
          </Box>
          </Grid>

          <Grid item xs={4}>
          <Box boxShadow={2}>
            <Paper square>
              <SearchLyrics />
            </Paper>
            <Box style={{ backgroundColor: '#323232' }}>
              <Lyrics />
            </Box>
          </Box>
          </Grid>

        </Grid>
      </Grid>

      
      <Grid item xs={12}>
        <BottomPanel />
      </Grid>
    </Grid>
  );
}

export default Home;
