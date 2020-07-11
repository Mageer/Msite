import { connect } from 'react-redux'
import CurrentPlayingTrack from '../components/current_playing_track'
import { fetchCurrentPlayingTrack } from '../actions/current_playing_track'
import { fetchLyrics } from '../actions/lyrics'

const mapStateToProps = state => {
    return {
        access_token: state.loginUser.access_token,
        trackName: state.currentPlayingTrack.trackName,
    }
}

const mapDispatchToProps = { 
    fetchCurrentPlayingTrack,
    fetchLyrics,
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentPlayingTrack)
