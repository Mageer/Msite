import { connect } from 'react-redux';
import CurrentPlayingTrack from '../components/CurrentPlayingTrack';
import { fetchCurrentPlayingTrackLyrics } from '../actions/currentPlayingTrack';

const mapStateToProps = (state) => ({
  accessToken: state.loginUser.accessToken,
  trackName: state.currentPlayingTrack.trackName,
});

const mapDispatchToProps = {
  fetchCurrentPlayingTrackLyrics,
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentPlayingTrack);
