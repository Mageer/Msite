import React from 'react';
import { useRouteMatch, Route, useLocation } from "react-router-dom";
import qs from 'query-string';
import { Box, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import SearchTracks from './tracks/SearchTracks';
import InfiniteList from './tracks/InfiniteList';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  searchBar: {
  },
  tracksList: {
    flex: '1',
    overflowY: 'auto', 
    backgroundColor: '#2A2A2A',
    color: '#F7F7F7',
    padding: '5px',
  },
});

function MiddlePanel() {
  const classes = useStyles();
  const { path } = useRouteMatch();
  const location = useLocation();
  const params = qs.parse(location.search);

  return(
    <Box boxShadow={0} className={classes.root}>
      <Paper square>
        <SearchTracks />
      </Paper>
      <div className={classes.tracksList}>
        <Route 
          path={path + "/saved-tracks"} 
          component={() => 
            <InfiniteList baseApiPathname={`/spotify/user-saved-tracks?`} playlist/>}
        />
        <Route 
          path={path + "/playlist"} 
          component={() => 
            <InfiniteList playlistId={params.list}/>}
        />
        <Route 
          path={path + "/search"} 
          component={() => 
            <InfiniteList search={params.track} />} 
        />
      </div>
    </Box>
  );
}

export default MiddlePanel;
