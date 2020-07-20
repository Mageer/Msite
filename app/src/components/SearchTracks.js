import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Button, TextField, Card } from '@material-ui/core';
import { fetchTracks } from '../actions/searchTracks';

function SearchTracks() {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const getTracks = (data) => dispatch(fetchTracks(data.search));

  return (
    <div>
    <Card>
      <form onSubmit={handleSubmit(getTracks)}>
        <TextField
          variant="outlined"
          margin="normal"
          inputRef={register}
          required
          id="search"
          label="Search"
          name="search"
        />
        <Button
        style={{ margin: 'bottom' }}
          variant="contained"
          color="primary"
          type="submit"
        >
          Search
        </Button>
      </form>
      </Card>
    </div>
  );
}

export default SearchTracks;
