import React from 'react';
import { Grid, Typography, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import prettyMilliseconds from 'pretty-ms';

const useStyles = makeStyles({
  albumArt: {
    height: '30px',
    width: '30px',
  }
});

function TrackListItem(props) {
  const { albumArtUrl, name, artists, duration } = props;
  const classes = useStyles();
  return(
    <Grid 
      container
      alignItems='center'
    >
      <Grid item xs={1}>
        <Avatar src={albumArtUrl} alt='Album Art' className={classes.albumArt}/>
      </Grid>
      <Grid item xs={5}>
        <Typography variant='caption'>
          {name}
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography variant='caption'>
          {artists.join(', ')}
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography variant='caption'>
          {prettyMilliseconds(duration, {
            secondsDecimalDigits: 0,
            colonNotation: true,
            })}
        </Typography>
      </Grid>
    </Grid> 
  );
}

export default TrackListItem;
