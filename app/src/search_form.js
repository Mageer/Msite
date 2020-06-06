import React, { Component } from 'react'
import Lyrics from './lyrics'

export class SearchForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
          value: '',
          lyrics: 'Lyrics will be displayed here'
        };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
        const lyrics = <Lyrics songName={this.state.value}/>
        this.setState({ lyrics });
        event.preventDefault();
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="Submit" value="Search" />
          <pre><p>{this.state.lyrics}</p></pre>
        </form>
      );
    }
}


export default SearchForm