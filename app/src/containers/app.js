import { connect } from 'react-redux';
import App from '../components/App';

const mapStateToProps = (state) => ({
  loggedIn: state.loginUser.loggedIn,
  username: state.loginUser.username,
});

export default connect(mapStateToProps)(App);
