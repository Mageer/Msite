import React from 'react';
import { useSelector } from 'react-redux';
import { Box } from '@material-ui/core';

function CurrentPlayingTrackAlbumArt() {
  const track = useSelector((state) => state.playbackStatus.currentTrack);
  if (!track) {
    return (
      <div></div>
    );
  }

  const albumArtUrl = track.album.images[0].url; // 64x64 px
  return (
    <img src={albumArtUrl} alt='Album Art' width={249}/>
  );
}

export default CurrentPlayingTrackAlbumArt;
