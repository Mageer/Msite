import React from 'react';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Welcome from './Welcome';
import Home from './Home';
import LoginSpotify from './auth/LoginSpotify';
import SpotifyCallback from './auth/SpotifyCallback';
import PageNotFound from './PageNotFound';
import LoadSpotifyPlaybackSDKScript from './player/LoadSpotifyPlaybackSDKScript';

function App() {
  return (
    <Router>
      <div className='Routes'>
        <Switch>

          <Route path="/home">
            <Home />
          </Route>

          <Route path="/login-spotify">
            <LoginSpotify />
          </Route>

          <Route path="/spotify-callback">
            <SpotifyCallback />
          </Route>

          <Route exact path="/">
            <Welcome />
          </Route>

          <Route path="*">
            <PageNotFound />
          </Route>

        </Switch>
      </div>
      <LoadSpotifyPlaybackSDKScript />
    </Router>
  );
}

export default App;
