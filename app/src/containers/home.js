import { connect } from 'react-redux';
import Home from '../components/Home';

const mapStateToProps = (state) => ({
  loggedIn: state.loginUser.loggedIn,
});

export default connect(mapStateToProps)(Home);
