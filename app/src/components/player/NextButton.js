import React from 'react';
import SkipNextRoundedIcon from '@material-ui/icons/SkipNextRounded';

function NextButton(props) {
  const { onClick, className } = props;
  return <SkipNextRoundedIcon className={className} onClick={onClick} />;
}

export default NextButton;
