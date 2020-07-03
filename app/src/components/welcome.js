import React, { Component } from 'react'
import Login from './login'

export class Welcome extends Component {

    render() {
        return (
            <div>
                <h1>
                    Welcome to M-site!
                </h1>
                <h2>
                    Please login
                </h2>
                <Login setLoggedin={this.props.setLoggedin} setAccessToken={this.props.setAccessToken} />
            </div>
        );
    }

}


export default Welcome;
