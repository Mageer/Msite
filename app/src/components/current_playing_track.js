import React, { Component } from "react";

export default class CurrentPlayingTrack extends Component {

    handleClick = async () => {
        await this.props.fetchCurrentPlayingTrack(this.props.access_token);
        await this.props.fetchLyrics(this.props.trackName);
    }

    render() {
        return (
            <button onClick={this.handleClick}>
                Current track
            </button>
        );
    }
}
