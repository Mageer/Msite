import React, { Component } from 'react'

export default class LoginSpotify extends Component {

    login = () => {
        const bearer = 'Bearer ' + this.props.access_token;
        const options = {
            method: 'GET',
            headers: {
                'Authorization': bearer
            }
        }

        return fetch("/spotify/login", options)
    }

    render() {
        return (
            <button onClick={this.login}>
                Login with Spotify
            </button>
        );
    }
}