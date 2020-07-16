import React, { Component } from 'react'
import {
    Route,
    BrowserRouter,
    Switch
} from "react-router-dom";

import Welcome from '../containers/welcome'
import Home from '../containers/home'
import LoginSpotify from '../containers/login_spotify'
import SpotifyCallback from '../containers/spotify_callback'
import PageNotFound from './page_not_found'

export class App extends Component {

    render() {
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
}


export default App;
