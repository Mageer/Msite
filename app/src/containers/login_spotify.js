import { connect } from 'react-redux'
import LoginSpotify from '../components/login_spotify'

const mapStateToProps = state => {
    return {
        access_token: state.loginUser.access_token
    }
}

export default connect(mapStateToProps)(LoginSpotify)
