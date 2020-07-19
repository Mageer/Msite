import React from 'react';
import {
  Route,
  BrowserRouter,
  Switch,
} from 'react-router-dom';
import Welcome from '../containers/Welcome';
import Home from '../containers/Home';
import LoginSpotify from '../containers/LoginSpotify';
import SpotifyCallback from '../containers/SpotifyCallback';
import PageNotFound from './PageNotFound';

function App() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

export default App;
