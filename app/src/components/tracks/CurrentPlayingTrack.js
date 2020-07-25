import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchCurrentPlayingTrackLyrics } from '../../actions/currentPlayingTrack';

function CurrentPlayingTrack() {
  const dispatch = useDispatch();
  const handleClick = () => dispatch(fetchCurrentPlayingTrackLyrics());

  return (
    <button onClick={handleClick}>
      {'Get Track Lyrics'}
    </button>
  );
}

export default CurrentPlayingTrack;
