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
                .then(res => res.json())
                .then(body => window.location.assign(body.url))
                .catch(err => console.log(err))
    }

    render() {
        return (
            <div>
            <h3>
                Connect account to Spotify
            </h3>
            <button onClick={this.login}>
                login
            </button>
            </div>
        );
    }
}