import { connect } from 'react-redux'
import SpotifyCallback from '../components/spotify_callback'
import { loginUserReceive } from '../actions/login_user'

const mapDispatchToProps = { 
    loginUserReceive
}; 

export default connect(null, mapDispatchToProps)(SpotifyCallback)
