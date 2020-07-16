import React, { Component } from 'react'
import LoginUser from '../containers/login_user'
import { Redirect } from 'react-router-dom'

export class Welcome extends Component {

    render() {
        if (this.props.loggedIn) {
            return <Redirect to="/home" />
        }
        
        return (
            <div className="outer" style={{
                display: 'flex',
            }}>
                <div className="user_login" style={{
                    margin: 'auto',
                    padding: '15px',
                    paddingTop: '100px',
                    top: '50%'
                }}>
                    <LoginUser />
                </div>
            </div>
        );
    }

}


export default Welcome;
