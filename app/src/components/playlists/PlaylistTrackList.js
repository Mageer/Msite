import React from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { useLocation } from "react-router-dom";
import qs from "query-string";
import { fetchMoreTracks } from "../../actions/playlists";
import TrackList from "../tracks/TrackList";

const missingItem = { tracks: [], isExhausted: false, isFetching: false };

function PlaylistTrackList() {
  const location = useLocation();
  const params = qs.parse(location.search);
  const playlistId = params.id;

  const dispatch = useDispatch();
  const { accessToken } = useSelector((state) => state.user, shallowEqual);
  const { items } = useSelector((state) => state.playlists, shallowEqual);
  const item = items[playlistId] || missingItem;

  const playTrack = (offset) => {
    const options = {
      method: "POST",
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    fetch(
      `${process.env.REACT_APP_API_URI}/spotify/play-playlist?uri=${encodeURI(
        playlistId
      )}&offset=${encodeURI(offset)}`,
      options
    ).catch((error) => console.log(error));
  };

  return (
    <TrackList
      loadMore={() => dispatch(fetchMoreTracks(playlistId))}
      onClick={(offset) => playTrack(offset)}
      useOffset={true}
      isExhausted={item.isExhausted}
      isFetching={item.isFetching}
      items={item.tracks}
    >
      {item.tracks}
    </TrackList>
  );
}

export default PlaylistTrackList;
