import React from "react";
import { useLocation } from "react-router-dom";
import qs from "query-string";
import SearchTrackList from "./SearchTrackList";
import MediaListWrapper from "../misc/MediaListWrapper";

function MusicSearchResult() {
  const location = useLocation();
  const params = qs.parse(location.search);

  return (
    <MediaListWrapper headerText={`Search results for '${params.query}'`}>
      <SearchTrackList search={params.query} />
    </MediaListWrapper>
  );
}

export default MusicSearchResult;
