import React from "react";
import { useSelector } from "react-redux";
import PlaylistsList from "./PlaylistsList";
import MediaListWrapper from "../misc/MediaListWrapper";

function MyPlaylists() {
  const playlists = useSelector((state) => state.userPlaylists.items);

  return (
    <MediaListWrapper headerText={"My playlists"}>
      <PlaylistsList
        loadMore={() => true}
        isExhausted={true}
        isFetching={false}
      >
        {playlists}
      </PlaylistsList>
    </MediaListWrapper>
  );
}

export default MyPlaylists;
