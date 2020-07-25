import React, { useState, useEffect } from 'react';
import Slider from '@material-ui/core/Slider';

function SeekBar() {
  const maxVal = 1000;
  const timeInt = 200;
  const stepVal = 1;
  const [prog, setProg] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      (prog <= maxVal - stepVal)? setProg(p => p + stepVal) : setProg(p => 0);
    }, timeInt);
    return () => clearInterval(interval);
  }, [prog]);

  const seek = (event, value) => {
    setProg((prog) => value)
  }

  return (
    <Slider value={prog} onChangeCommitted={seek} max={maxVal} />
  );
}

export default SeekBar;
