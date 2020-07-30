import React, { useState, useEffect } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import Slider from '@material-ui/core/Slider';

function SeekBar(props) {
    const { duration } = useSelector((state) => state.playbackStatus, shallowEqual);
    const { getPosition, seek } = props;
    const updateRate = 100;
    const maxVal = ~~(duration/updateRate); // Force int
    const [prog, setProg] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        getPosition().then((position) => setProg(p => ~~(position/updateRate) % maxVal));
      }, updateRate);
      return () => clearInterval(interval);
    });
  
    const onSeek = (event, value) => {
      console.log(value/maxVal)
      seek((value/maxVal)*duration);
    }
  
    return (
        <Slider value={prog} onChangeCommitted={onSeek} max={maxVal} />
    );
}

export default SeekBar;
