import React, { Component } from 'react'

export class Lyrics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            lyrics: null,
        }
    }

    get_lyrics = (search) => {
        this.setState({name: "Please wait for lyrics...", lyrics: null});
        fetch("/lyrics?search=" + encodeURI(search))
        .then((res) => res.json())
        .then(({name, lyrics}) => this.setState({name, lyrics}))
        .catch((err) => this.setState({name: "No matching song found..."}));
    }

    componentDidMount() {
        if (this.props.songName){
            this.get_lyrics(this.props.songName); 
        }
    }
    
    render() {
        return (
          <div>
            <pre>
                <h2>{this.state.name}</h2>
                <p>{this.state.lyrics}</p>
            </pre>
          </div>
        );
    }
}


export default Lyrics

