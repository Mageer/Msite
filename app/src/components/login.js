import React, { Component } from 'react'

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        }
    }


    handleUsernameChange = (event) => {
        this.setState({ username: event.target.value });
    }


    handlePasswordChange = (event) => {
        this.setState({ password: event.target.value });
    }


    loginUser = async (username, password) => {
        const data = { username, password }
        const options = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(data)
        }

        // TODO: Consider swapping fetch with axios
        const res = await fetch("/user/login", options);

        if ( res.ok ) {
            return await res.json();
        } else {
            throw new Error('Login failed');
        }
    }


    handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const tokens = await this.loginUser(this.state.username, this.state.password);
            this.props.setLoggedin(true);
            this.props.setAccessToken(tokens.access_token);
        } catch (err) {
            this.props.setLoggedin(false);
            console.log(err);
        }
    }


    render() {

        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    <input type="text" value={this.state.username} onChange={this.handleUsernameChange} />
                    <br></br>
                    <input type="text" value={this.state.password} onChange={this.handlePasswordChange} />
                </label>
                <br></br>
                <input type="submit" value="Login" />
            </form>
        );
    }

}


export default Login;
