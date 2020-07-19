import React from 'react';
import { useForm } from 'react-hook-form';

function Lyrics(props) {
  const { fetchLyrics } = props;
  const { register, handleSubmit, errors } = useForm();
  const searchSong = (data) => fetchLyrics(data.search);

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

export default Lyrics;
