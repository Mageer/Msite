import { connect } from 'react-redux'
import LoginUser from '../components/login_user'
import { loginUser } from '../actions/login_user'

const mapStateToProps = state => {
    return {
        isFetching: state.loginUser.isFetching
    }
}

const mapDispatchToProps = { loginUser };

export default connect(mapStateToProps, mapDispatchToProps)(LoginUser)
