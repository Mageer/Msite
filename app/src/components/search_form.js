import React, { Component } from 'react'

export class SearchForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
        value: '',
        buttonText: 'Search'
      };
    }
  
    handleChange = (event) => {
      this.setState({value: event.target.value});
    }
  
    handleSubmit = (event) => {
      console.log('ok');
      this.props.onSubmit(this.state.value);
      console.log('bound');
      event.preventDefault(); // Unsure.
    }

    render() {
      return (
        <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Search" />
        </form>
        </div>
      );
    }
}


export default SearchForm;