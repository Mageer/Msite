import {
    CURRENT_PLAYING_TRACK_REQUEST,
    CURRENT_PLAYING_TRACK_SUCCESS,
    CURRENT_PLAYING_TRACK_FAILURE,
} from '../actions/current_playing_track'


const initialTrack = {
    trackName: '',
    isFetching: false
}

export const currentPlayingTrack = (state = initialTrack, action) => {
    switch (action.type) {
        case CURRENT_PLAYING_TRACK_REQUEST:
            return {
                ...state,
                trackName: '',
                isFetching: true,
            }
        case CURRENT_PLAYING_TRACK_SUCCESS:
            return {
                ...state,
                trackName: action.trackName,
                isFetching: false,
            }
        case CURRENT_PLAYING_TRACK_FAILURE:
            return {
                ...state,
                isFetching: false,
            }
        default:
            return state;
    }
}

