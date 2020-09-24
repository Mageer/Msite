// Remove text inside () and after - (RegExp magic)
const trimSearchText = (text) =>
  text.replace(/ *\([^)]*\)*/g, "").replace(/-.*$/, "");

const lyricsId = (track) => {
  if (!track) {
    return "";
  }
  const trimmedName = trimSearchText(track.name);
  const artists = track.artists.map((artist) => artist.name);
  const searchQuery = `${artists.join(" ")} ${trimmedName}`;
  return searchQuery;
};

export default lyricsId;
