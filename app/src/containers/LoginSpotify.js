import { connect } from 'react-redux';
import LoginSpotify from '../components/LoginSpotify';

const mapStateToProps = (state) => ({
  accessToken: state.loginUser.accessToken,
});

export default connect(mapStateToProps)(LoginSpotify);
