import React, { Component } from 'react'
import SearchForm from './search_form'

export class LyricsWindow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            lyrics: null,
        };
    }


    get_lyrics = (search) => {
        this.setState({name: "Please wait for lyrics...", lyrics: null});

        fetch("/lyrics?search=" + encodeURI(search))
            .then((res) => res.json())
            .then(({name, lyrics}) => this.setState({name, lyrics}))
            .catch((err) => this.setState({name: "No matching song found..."}));
    }


    handleSubmit = (value) => {
        this.get_lyrics(value);
    }


    render() {
        return (
            <div>
            <SearchForm onSubmit={this.handleSubmit}/>
            <pre>
                <h2>{this.state.name}</h2>
                <p>{this.state.lyrics}</p>
            </pre>
            </div>
        );
      }
}


export default LyricsWindow;
