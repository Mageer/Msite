import React, { Component } from 'react'
import LoginUser from '../containers/login_user'

export class Welcome extends Component {

    render() {
        return (
            <div>
                <h1>
                    Welcome to M-site!
                </h1>
                <h2>
                    Please login
                </h2>
                <LoginUser />
            </div>
        );
    }

}


export default Welcome;
