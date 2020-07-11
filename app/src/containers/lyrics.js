import { connect } from 'react-redux'
import Lyrics from '../components/lyrics'

const mapStateToProps = state => {
    return {
      songName: state.lyrics.songName,
      lyrics: state.lyrics.lyrics,
      isFetching: state.lyrics.isFetching,
      currentPlayingTrack: state.currentPlayingTrack.trackName,
    }
}

export default connect(mapStateToProps)(Lyrics)
