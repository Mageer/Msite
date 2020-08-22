import React from 'react';
import { useSelector } from 'react-redux';
import jwt from 'jsonwebtoken';
import { Paper, Grid} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import useSpotifyPlayer from './player/useSpotifyPlayer';
import CurrentPlayingTrackInformation from './tracks/CurrentPlayingTrackInformation';
import PlayerControls from './player/PlayerControls';
import VolumeControl from './player/VolumeControl';

const useStyles = makeStyles({
  trackInformation: {
    paddingLeft: '15px',
  },
  volumeControl: {
    textAlign: 'right',
    paddingRight: '30px',
  },
});

function BottomPanel() {
  const classes = useStyles();

  const jwtToken = useSelector((state) => state.user.accessToken);
  const decodedJwt = jwt.decode(jwtToken);
  const spotifyAccessToken = decodedJwt.tokens.spotify;

  const player = useSpotifyPlayer(spotifyAccessToken);

  if (!player) {
    return(<div></div>);
  }

  return(
    <Paper elevation={2} square>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item xs={3} className={classes.trackInformation}>
          <CurrentPlayingTrackInformation />
        </Grid>

        <Grid item xs={6}>
          <PlayerControls player={player} />
        </Grid>

        <Grid item xs={3} className={classes.volumeControl}>
          <VolumeControl setVolume={(volume) => player.setVolume(volume)}/>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default BottomPanel;
