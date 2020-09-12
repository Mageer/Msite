import React from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { List, ListItem, ListSubheader } from '@material-ui/core';
import qs from 'query-string';


function UserPlaylists() {
  const { path } = useRouteMatch();
  const history = useHistory();
  const dispatch = useDispatch();
  const { playlists } = useSelector((state) => state.userPlaylists, shallowEqual);

  
  const handleClick = (playlistId) => {
    const pathname = `${path}/playlist`;
    const search = qs.stringify({ list: playlistId});
    history.push({ pathname, search });
  }
  
  const listItems = () => {
    if (!playlists) {
      return null;
    }
    return (
      playlists.map((playlist) => 
        <ListItem button divider key={playlist.id} onClick={() => handleClick(playlist.id)}>
          {playlist.name}
        </ListItem>) 
    );
  }

  return(
    <List>
      {/* <ListSubheader>User playlists</ListSubheader> */}
        {listItems()}
    </List>
  );
}

export default UserPlaylists;
