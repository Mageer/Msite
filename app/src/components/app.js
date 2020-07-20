import React from 'react';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Welcome from './Welcome';
import Home from './Home';
import LoginSpotify from './LoginSpotify';
import SpotifyCallback from './SpotifyCallback';
import PageNotFound from './PageNotFound';

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
    </Router>
  );
}

export default App;
