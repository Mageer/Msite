import { connect } from 'react-redux'
import LoginSpotify from '../components/login_spotify'
import { loginUserReceive } from '../actions/login_user'

const mapStateToProps = state => {
    return {
        access_token: state.loginUser.access_token
    }
}

const mapDispatchToProps = { 
    loginUserReceive
}; 

export default connect(mapStateToProps, mapDispatchToProps)(LoginSpotify)
