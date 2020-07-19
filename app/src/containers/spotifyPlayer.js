import { connect } from 'react-redux';
import SpotifyPlayer from '../components/SpotifyPlayer';

const mapStateToProps = (state) => ({
  jwtToken: state.loginUser.accessToken,
});

export default connect(mapStateToProps)(SpotifyPlayer);
