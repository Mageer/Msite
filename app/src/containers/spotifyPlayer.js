import { connect } from 'react-redux'
import SpotifyPlayer from '../components/spotifyPlayer'

const mapStateToProps = state => {
    return {
        jwt_token: state.loginUser.access_token
    }
}

export default connect(mapStateToProps)(SpotifyPlayer)
