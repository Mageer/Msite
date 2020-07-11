import React, { Component } from 'react'
import Welcome from './welcome'
import Lyrics from '../containers/lyrics'

export class App extends Component {

    render() {
        const home = this.props.loggedIn ? <Lyrics /> : <Welcome />;
        return (
            <div>
                {home}
            </div>
        );
    }
}


export default App;
