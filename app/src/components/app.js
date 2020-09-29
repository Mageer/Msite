import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Welcome from "./Welcome";
import Home from "./Home";
import LoginSpotify from "./auth/LoginSpotify";
import SpotifyCallback from "./auth/SpotifyCallback";
import PageNotFound from "./PageNotFound";

function App() {
  return (
    <Router>
      <div className="Routes" style={{ height: "100%" }}>
        <Switch>
          <Route path="/login-spotify">
            <LoginSpotify />
          </Route>

          <Route path="/spotify-callback">
            <SpotifyCallback />
          </Route>

          <Route exact path="/login">
            <Welcome />
          </Route>

          <Route path="/">
            <Home />
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
