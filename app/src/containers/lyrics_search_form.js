import { connect } from 'react-redux'
import { fetchLyrics } from '../actions/lyrics'
import LyricsSearchForm from '../components/lyrics_search_form'

const mapStateToProps = state => {
    return {
      isFetching: state.lyrics.isFetching,
    }
}

const mapDispatchToProps = { fetchLyrics };

export default connect(mapStateToProps, mapDispatchToProps)(LyricsSearchForm)
