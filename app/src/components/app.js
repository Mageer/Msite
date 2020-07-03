import React, { Component } from 'react'
import Welcome from './welcome'
import Lyrics from '../containers/lyrics'

export class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedin: false,
            access_token: '',
        }
    }


    setLoggedin = (loggedin) => {
        this.setState({ loggedin });
    }

    setAccessToken = (token) => {
        this.setState({ access_token: token });
    }


    render() {
        const home = this.state.loggedin ? <Lyrics /> : <Welcome setLoggedin={this.setLoggedin} setAccessToken={this.setAccessToken} />;
        return (
            <div>
                {home}
            </div>
        );
    }
}



export default App;
