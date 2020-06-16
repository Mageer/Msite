import React, { Component } from 'react'

export class SearchButton extends Component {
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
  
    handleClick = (event) => {
      this.props.onClick(this.state.value);
      event.preventDefault(); // Unsure.
    }

    render() {
      return (
        <div>
          <label>
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <button onClick={this.handleClick}>{this.state.buttonText}</button>
        </div>
      );
    }
}


export default SearchButton;