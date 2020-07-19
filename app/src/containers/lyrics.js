import { connect } from 'react-redux';
import Lyrics from '../components/Lyrics';

const mapStateToProps = (state) => ({
  songName: state.lyrics.songName,
  lyrics: state.lyrics.lyrics,
  isFetching: state.lyrics.isFetching,
});

export default connect(mapStateToProps)(Lyrics);
