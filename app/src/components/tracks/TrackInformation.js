import React from 'react';
import { useSelector } from 'react-redux';

function TrackInformation() {
  const track = useSelector((state) => state.playbackStatus.currentTrack);
  if (!track) {
    return (
      <div>
        <h4>
          No track playing
        </h4>
      </div>
    );
  }
  
  const trackName = track.name;
  const artistName = track.artists[0].name;
  const albumArtUrl = track.album.images[1].url; // 64x64 px
  return (
    <div style={{ color: 'white', fontSize: '20px', verticalAlign: 'middle', whiteSpace: 'pre' }}>
      <img src={albumArtUrl} alt='Album Art' />
      {`      ${artistName} - ${trackName}`}
    </div>
  );
}

export default TrackInformation;
