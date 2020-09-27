const getTrackIdAndLinkedFromId = (currentTrack) => {
  const currentTrackId = currentTrack ? currentTrack.id : null;
  const currentTrackLinkedFromId =
    currentTrack && currentTrack.linked_from_uri
      ? currentTrack.linked_from_uri.replace("spotify:track:", "")
      : null;
  return {
    currentTrackId,
    currentTrackLinkedFromId,
  };
};

export default getTrackIdAndLinkedFromId;