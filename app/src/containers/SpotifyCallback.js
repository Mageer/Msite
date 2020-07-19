import { connect } from 'react-redux';
import SpotifyCallback from '../components/SpotifyCallback';
import { loginUserSuccess } from '../actions/loginUser';

const mapDispatchToProps = {
  loginUserSuccess,
};

export default connect(null, mapDispatchToProps)(SpotifyCallback);
