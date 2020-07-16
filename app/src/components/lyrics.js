import React, { Component } from 'react'
import LyricsSearchForm from '../containers/lyrics_search_form'
import CurrentPlayingTrack from '../containers/current_playing_track'
import ScaleLoader from "react-spinners/ScaleLoader";


export class Lyrics extends Component {

    render() {
        return (
            <div style={{ textAlign: 'center'}}>
            <LyricsSearchForm />
            <CurrentPlayingTrack />
            <div style={{ textAlign: 'left'}}>
                <pre>
                    <h2>{this.props.songName}</h2>
                    <p>{this.props.lyrics}</p>
                </pre>
            </div>
            <ScaleLoader size={50} color={"#99ff99"} loading={this.props.isFetching} />
            </div>
        );
      }
}


export default Lyrics;