import React, { Component } from 'react'
import SearchForm from './search_form'
import { fetchLyrics } from '../actions/lyrics';
import ScaleLoader from "react-spinners/ScaleLoader";


export class LyricsWindow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            lyrics: null,
        };
    }
    

    handleSubmit = async (value) => {
        this.props.dispatch(fetchLyrics(value));
    }


    render() {
        return (
            <div>
            <SearchForm onSubmit={this.handleSubmit}/>
            <pre>
                <h2>{this.props.lyrics.songName}</h2>
                <p>{this.props.lyrics.lyrics}</p>
            </pre>
            <ScaleLoader size={50} color={"#99ff99"} loading={this.props.lyrics.isFetching} />
            </div>
        );
      }
}


export default LyricsWindow;