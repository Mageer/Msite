import {
    LYRICS_REQUEST,
    LYRICS_SUCCESS,
    LYRICS_FAILURE,
} from '../actions/lyrics'


const initalLyrics = {
    songName: '',
    isFetching: false,
    lyrics: ''
}

export const lyrics = (state = initalLyrics, action) => {
    switch (action.type) {
        case LYRICS_REQUEST:
            return {
                ...state,
                songName: '',
                lyrics: '',
                isFetching: true,
            }
        case LYRICS_SUCCESS:
            return {
                ...state,
                songName: action.songName,
                isFetching: false,
                lyrics: action.lyrics
            }
        case LYRICS_FAILURE: // Add failure message
            return {
                ...state,
                songName: '',
                isFetching: false,
                lyrics: 'Lyrics not found',
            }
        default:
            return state;
    }
}

