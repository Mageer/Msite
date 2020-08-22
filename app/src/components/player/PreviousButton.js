import React from 'react';
import SkipPreviousRoundedIcon from '@material-ui/icons/SkipPreviousRounded';

function NextButton(props) {
  const { onClick, className } = props;
  return (
    <SkipPreviousRoundedIcon className={className} onClick={onClick}/>
  );
}

export default NextButton;
