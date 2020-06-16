import React, { Component } from 'react'
import SearchButton from './search_button'

export class LyricsWindow extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            search: 'hey ya',
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

    handleClick = (value) => {
        this.setState({songName: value});
        this.get_lyrics(value);
    }

    render() {
        return (
            <div>
            <SearchButton onClick={this.handleClick}/>
            <pre>
                <h2>{this.state.name}</h2>
                <p>{this.state.lyrics}</p>
            </pre>
            </div>
        );
      }
}


export default LyricsWindow;
