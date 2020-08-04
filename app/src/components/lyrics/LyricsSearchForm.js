import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { fetchLyrics } from '../../actions/lyrics';

function LyricsSearchForm() {
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm();
  const searchSong = (data) => dispatch(fetchLyrics(data.search));

  return (
    <form>
      <br/>
      <br/>
      <input
        name="search"
        placeholder="Search"
        ref={register({ required: true })}
      />

      <button type="submit" name="searchSong" onClick={handleSubmit(searchSong)}>Go!</button>
      <br/>

      {errors.search && <span style={{ color: 'red' }}> required</span>}
    </form>
  );
}

export default LyricsSearchForm;
