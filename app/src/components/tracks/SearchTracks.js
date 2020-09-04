import React from 'react';
import { useDispatch } from 'react-redux';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Input } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import qs from 'query-string';
import { fetchTracks } from '../../actions/searchTracks';

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.text.secondary,
  },
}))

function SearchTracks() {
  const { path } = useRouteMatch();
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const { register, handleSubmit } = useForm();

  const getTracks = (data) => {
    const search = qs.stringify({ track: data.search })
    const pathname = path + '/search';
    history.push({ pathname, search });
  }

  return (
    <div  style={{ padding: '10px' }}>
      <form onSubmit={handleSubmit(getTracks)}>
        <Input
          inputRef={register}
          name="search"
          placeholder="Search music"
          autoComplete='off'
        />
      </form>
    </div>
  );
}

export default SearchTracks;
