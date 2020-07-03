import { connect } from 'react-redux'
import LyricsWindow from '../components/lyrics_window'

const mapStateToProps = state => {
    return {
      lyrics: state.lyrics,
      name: state.songName,
      isFetching: state.isFetching
    }
}
  
const Lyrics = connect(mapStateToProps)(LyricsWindow)
  
export default Lyrics
