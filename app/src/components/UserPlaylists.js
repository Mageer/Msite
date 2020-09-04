import React from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { List, ListItem, ListSubheader } from '@material-ui/core';


function UserPlaylists() {
  const { path } = useRouteMatch();
  const history = useHistory();

  const handleClick = () => {
    const pathname = path + '/saved-tracks';
    history.push({ pathname });
  }

  return(
    <List>
      <ListSubheader>User playlists</ListSubheader>
      <ListItem button divider onClick={handleClick}>
        Saved tracks
      </ListItem>
  </List>
  );
}

export default UserPlaylists;
