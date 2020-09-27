import React from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { fetchMoreTracks } from "../../actions/search";
import TrackList from "../tracks/TrackList";

const missingItem = { tracks: [], isExhausted: false, isFetching: false };

function SearchTrackList(props) {
  const { search: query } = props;
  const dispatch = useDispatch();
  const { accessToken } = useSelector((state) => state.user, shallowEqual);
  const { items } = useSelector((state) => state.search, shallowEqual);
  const item = items[query] || missingItem;

  const playTrack = (uri) => {
    const options = {
      method: "POST",
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    fetch(
      `${process.env.REACT_APP_API_URI}/spotify/play-track?uri=${encodeURI(
        uri
      )}`,
      options
    ).catch((error) => console.log(error));
  };

  return (
    <TrackList
      loadMore={() => dispatch(fetchMoreTracks(query))}
      onClick={(uri) => playTrack(uri)}
      useOffset={false}
      isExhausted={item.isExhausted}
      isFetching={item.isFetching}
      items={item.tracks}
    >
      {item.tracks}
    </TrackList>
  );
}

export default SearchTrackList;
