import React, { Component } from 'react'
import LyricsSearchForm from '../containers/lyrics_search_form'
import CurrentPlayingTrack from '../containers/current_playing_track'
import LoginSpotify from '../containers/login_spotify'
import ScaleLoader from "react-spinners/ScaleLoader";


export class Lyrics extends Component {

    render() {
        return (
            <div>
            <LoginSpotify />
            <LyricsSearchForm />
            <CurrentPlayingTrack />
            <pre>
                <h2>{this.props.songName}</h2>
                <p>{this.props.lyrics}</p>
            </pre>
            <ScaleLoader size={50} color={"#99ff99"} loading={this.props.isFetching} />
            </div>
        );
      }
}


export default Lyrics;