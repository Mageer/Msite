import { connect } from 'react-redux';
import LoginUser from '../components/LoginUser';
import { loginUser } from '../actions/loginUser';

const mapStateToProps = (state) => ({
  loginError: state.loginUser.error,
  isFetching: state.loginUser.isFetching,
});

const mapDispatchToProps = { loginUser };

export default connect(mapStateToProps, mapDispatchToProps)(LoginUser);
