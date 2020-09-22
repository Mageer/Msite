import React from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Input } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import qs from "query-string";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.text.secondary,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
}));

function MusicSearch() {
  const classes = useStyles();
  const { register, handleSubmit } = useForm();
  const history = useHistory();

  const getTracks = (data) => {
    const search = qs.stringify({ query: data.search });
    const pathname = '/search';
    history.push({ pathname, search });
  };

  return (
    <div className={classes.root}>
            <SearchIcon />
      <form onSubmit={handleSubmit(getTracks)}>
        <Input
          inputRef={register}
          name="search"
          placeholder="Search music"
          autoComplete="off"
        />
      </form>
    </div>
  );
}

export default MusicSearch;
