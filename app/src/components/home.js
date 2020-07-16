import React from 'react'
import Lyrics from '../containers/lyrics'
import SpotifyPlayer from '../containers/spotifyPlayer'
import RefreshAccessToken from './refresh_access_token'
import LoginSpotify from '../containers/login_spotify'
import { Redirect } from 'react-router-dom'
import SplitPane from 'react-split-pane'

export default function ({ loggedIn }) {
    
    if ( !loggedIn ){
        return <Redirect to="/" />
    }

    return (
        <div>
        <SplitPane split="vertical" defaultSize="50%" style={{height:'98vh'}}>
            <div style={{ 
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                color: 'white',
                margin:'10px',
                padding: '15px',
                marginRight:'5px',
                overflowY: 'auto',
                wordWrap: 'break-word',
                height:'95vh'
            }}>
                <div style={{
                    display:'table',
                    margin:'10px auto'
                }}>
                <SpotifyPlayer />
                <RefreshAccessToken />
                <LoginSpotify />
                </div>
            </div>

            <div style={{ 
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                color: 'white',
                margin:'10px',
                padding: '15px',
                marginLeft:'5px',
                overflowY: 'auto',
                wordWrap: 'break-word',
                height:'95vh'
            }}>
                <div style={{
                    display:'table',
                    margin:'10px auto'
                }}>
                    <Lyrics />
                </div>
            </div>
        </SplitPane>
        </div>
    );
}