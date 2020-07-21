import React from 'react';
import SkipNextRoundedIcon from '@material-ui/icons/SkipNextRounded';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    '&:hover': {
      color: 'rgb(153, 255, 153, 0.8)',
      cursor: 'pointer',
    },
    '&:active': {
      color: 'rgb(153, 255, 153, 0.5)',
      cursor: 'pointer',
    },
    fontSize: '50px',
  },
})

function NextButton() {
  const classes = useStyles();
  return (
    <SkipNextRoundedIcon className={classes.root} onClick={() => console.log('next')}/>
  );
}

export default NextButton;
