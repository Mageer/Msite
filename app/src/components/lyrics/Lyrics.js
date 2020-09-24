import React, { useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { fetchLyrics } from "../../actions/lyrics";
import LyricsText from "./LyricsText";

function Lyrics() {
  const { currentLyricsId, items: lyricsItems } = useSelector(
    (state) => state.lyrics,
    shallowEqual
  );

  const dispatch = useDispatch();
  useEffect(() => {
    if (currentLyricsId && !lyricsItems[currentLyricsId]) {
      dispatch(fetchLyrics(currentLyricsId));
    }
  }, [currentLyricsId, lyricsItems, dispatch]);

  return <LyricsText />;
}

export default Lyrics;
