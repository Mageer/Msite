import { connect } from 'react-redux'
import App from '../components/app'

const mapStateToProps = state => {
    return {
      loggedIn: state.loginUser.loggedIn,
      username: state.loginUser.username
    }
}

export default connect(mapStateToProps)(App)
