import { connect } from 'react-redux'
import Home from '../components/home'

const mapStateToProps = state => {
    return {
        loggedIn: state.loginUser.loggedIn
    }
}

export default connect(mapStateToProps)(Home)