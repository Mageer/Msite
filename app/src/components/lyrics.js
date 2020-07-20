import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import ScaleLoader from 'react-spinners/ScaleLoader';
import LyricsSearchForm from './LyricsSearchForm';
import CurrentPlayingTrack from './CurrentPlayingTrack';

function Lyrics() {
  const { songName, lyrics, isFetching } = useSelector((state) => state.lyrics, shallowEqual);

  return (
    <div style={{ textAlign: 'center' }}>
      <LyricsSearchForm />
      <CurrentPlayingTrack />
      <div style={{ textAlign: 'left' }}>
        <pre>
          <h2>{songName}</h2>
          <p>{lyrics}</p>
        </pre>
      </div>
      <ScaleLoader size={50} color={'#99ff99'} loading={isFetching} />
    </div>
  );
}

export default Lyrics;
