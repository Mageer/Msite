import React from 'react';
import SkipPreviousRoundedIcon from '@material-ui/icons/SkipPreviousRounded';
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

function NextButton(props) {
  const classes = useStyles();
  const { onClick } = props;
  return (
    <SkipPreviousRoundedIcon className={classes.root} onClick={onClick}/>
  );
}

export default NextButton;
