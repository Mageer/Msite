import React from 'react';
import { Input } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { fetchLyrics } from '../../actions/lyrics';

function LyricsSearch() {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const searchSong = (data) => dispatch(fetchLyrics(data.search));

  return (
    <div style={{ padding: '5px' }}>
      <form onSubmit={handleSubmit(searchSong)}>
        <Input
          inputRef={register}
          name="search"
          placeholder="Search lyrics"
          autoComplete='off'
        />
      </form>
    </div>
  );
}

export default LyricsSearch;
