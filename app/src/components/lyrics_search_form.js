import React from "react";
import { useForm } from "react-hook-form";

export default function ({ fetchLyrics }) {
  const { register, handleSubmit, errors } = useForm();

  const searchSong = (data) => {
      fetchLyrics(data.search);
  }

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

        {errors.search && <span style={{color: "red"}}> required</span>}
    </form>
  );
}
