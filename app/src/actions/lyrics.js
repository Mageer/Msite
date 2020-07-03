export const LYRICS_REQUEST = 'LYRICS_REQUEST';
const lyricsRequest = (songName) => ({
    type: LYRICS_REQUEST,
    songName
});


export const LYRICS_SUCCESS = 'LYRICS_SUCCESS';
const lyricsReceive = (songName, lyrics) => ({
    type: LYRICS_SUCCESS,
    songName,
    lyrics
});


export const LYRICS_FAILURE = 'LYRICS_FAILURE';
const lyricsFailure = (songName) => ({
    type: LYRICS_FAILURE,
    songName,
})


export const fetchLyrics = (songName) => {
    return (dispatch) => {
        dispatch(lyricsRequest(songName));

        return fetch("/lyrics?search=" + encodeURI(songName))
                    .then(res => res.json())
                    .then(({ name, lyrics }) => dispatch(lyricsReceive(name, lyrics)))
                    .catch(err => dispatch(lyricsFailure(songName)));
    }
}




