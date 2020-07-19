import { connect } from 'react-redux';
import Welcome from '../components/Welcome';

const mapStateToProps = (state) => ({
  loggedIn: state.loginUser.loggedIn,
});

export default connect(mapStateToProps)(Welcome);
