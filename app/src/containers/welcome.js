import { connect } from 'react-redux'
import Welcome from '../components/welcome'

const mapStateToProps = state => {
    return {
        loggedIn: state.loginUser.loggedIn
    }
}

export default connect(mapStateToProps)(Welcome)