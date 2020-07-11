export const CURRENT_PLAYING_TRACK_REQUEST = 'CURRENT_PLAYING_TRACK_REQUEST';
const currentPlayingTrackRequest = (access_token) => ({
    type: CURRENT_PLAYING_TRACK_REQUEST,
    access_token
});


export const CURRENT_PLAYING_TRACK_SUCCESS = 'CURRENT_PLAYING_TRACK_SUCCESS';
const currentPlayingTrackSuccess = (trackName) => ({
    type: CURRENT_PLAYING_TRACK_SUCCESS,
    trackName
});


export const CURRENT_PLAYING_TRACK_FAILURE = 'CURRENT_PLAYING_TRACK_FAILURE';
const currentPlayingTrackFailure = () => ({
    type: CURRENT_PLAYING_TRACK_FAILURE,
})


export const fetchCurrentPlayingTrack = (access_token) => {
    return (dispatch) => {
        dispatch(currentPlayingTrackRequest(access_token));
        
        const bearer = 'Bearer ' + access_token;
        const options = {
            method: 'GET',
            headers: {
                'Authorization': bearer
            }
        }

        return fetch("/spotify/current-playing-track", options)
                    .then(res => res.json())
                    .then(({ trackName }) => dispatch(currentPlayingTrackSuccess(trackName)))
                    .catch(err => dispatch(currentPlayingTrackFailure()));
    }
}
