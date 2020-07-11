export const LYRICS_REQUEST = 'LYRICS_REQUEST';
const lyricsRequest = (searchQuery) => ({
    type: LYRICS_REQUEST,
    searchQuery
});


export const LYRICS_SUCCESS = 'LYRICS_SUCCESS';
const lyricsReceive = (songName, lyrics) => ({
    type: LYRICS_SUCCESS,
    songName,
    lyrics
});


export const LYRICS_FAILURE = 'LYRICS_FAILURE';
const lyricsFailure = (searchQuery) => ({
    type: LYRICS_FAILURE,
    searchQuery,
})


export const fetchLyrics = (searchQuery) => {
    return (dispatch) => {
        dispatch(lyricsRequest(searchQuery));
        console.log(searchQuery);
        return fetch("/lyrics?search=" + encodeURI(searchQuery))
                    .then(res => res.json())
                    .then(({ name, lyrics }) => dispatch(lyricsReceive(name, lyrics)))
                    .catch(err => dispatch(lyricsFailure(searchQuery)));
    }
}
