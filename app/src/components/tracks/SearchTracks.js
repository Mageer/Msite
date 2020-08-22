import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Input, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import { fetchTracks } from '../../actions/searchTracks';

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.text.secondary,
  },
}))

function SearchTracks() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { register, handleSubmit } = useForm();

  const getTracks = (data) => dispatch(fetchTracks(data.search));

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
