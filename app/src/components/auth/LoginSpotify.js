import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import SpotifyLogo from "../../media/spotify_logo.png";
import SpotifyLogoHover from "../../media/spotify_logo_hover.png";
import SpotifyLogoActive from "../../media/spotify_logo_active.png";

const useStyles = makeStyles({
  spotifyLogin: {
    width: "250px",
    height: "250px",
    "&:hover": {
      cursor: "pointer",
    },
    "&:active": {
      cursor: "pointer",
    },
  },
});

function LoginSpotify() {
  const classes = useStyles();
  const [imgSrc, setImgSrc] = useState(SpotifyLogo);

  const login = () => {
    return fetch(`${process.env.REACT_APP_API_URI}/login-with-spotify/login`, {
      method: "POST",
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Login failed");
      })
      .then((body) => window.location.assign(body.url))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <img
        src={imgSrc}
        alt="my img"
        onClick={login}
        onMouseOver={() => setImgSrc(SpotifyLogoHover)}
        onMouseOut={() => setImgSrc(SpotifyLogo)}
        onMouseDown={() => setImgSrc(SpotifyLogoActive)}
        onMouseUp={() => setImgSrc(SpotifyLogoHover)}
        className={classes.spotifyLogin}
      />
    </div>
  );
}

export default LoginSpotify;
