import { connect } from 'react-redux';
import { fetchLyrics } from '../actions/lyrics';
import LyricsSearchForm from '../components/LyricsSearchForm';

const mapStateToProps = (state) => ({
  isFetching: state.lyrics.isFetching,
});

const mapDispatchToProps = { fetchLyrics };

export default connect(mapStateToProps, mapDispatchToProps)(LyricsSearchForm);
