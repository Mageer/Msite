import React from 'react';
import { makeStyles } from '@material-ui/styles';
import lime from '@material-ui/core/colors/lime';
import PreviousButton from './PreviousButton';
import PlayButton from './PlayButton';
import NextButton from './NextButton';

const buttonStyle = {
  '&:hover': {
    color: lime[500],
    cursor: 'pointer',
  },
  '&:active': {
    color: lime[800],
    cursor: 'pointer',
  },
};

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSmall: {
    ...buttonStyle,
    fontSize: '30px',
  },
  buttonLarge: {
     ...buttonStyle,
    // fontSize: '30px',
  }
})

function PlayerButtons(props) {
  const { previousTrack, resume, pause, nextTrack } = props;
  const classes = useStyles();
  return(
    <div className={classes.root}>
      <PreviousButton onClick={previousTrack} className={classes.buttonSmall} />
      <PlayButton resume={resume} pause={pause} className={classes.buttonLarge} />
      <NextButton onClick={nextTrack} className={classes.buttonSmall} />
    </div>
  );
}

export default PlayerButtons;
