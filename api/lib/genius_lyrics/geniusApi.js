const fetch = require('node-fetch');
const cheerio = require('cheerio');

function geniusApi(token) {
    this._token = token;
    this._auth = {'Authorization': 'Bearer ' + this._token};
};
  
geniusApi.prototype = {   
    /**
     * Get's the URL for the webpage containing the lyrics.
     * 
     * The Genius API does not return the lyrics.
     * However, it returns the URL to the webpage containing it.
     * 
     * @param {String} search_keyword
     * @return {String} 
     * @private 
     */  
    getSongURL : async function(search_keyword){
        if ( !search_keyword ){
            throw Error('Search empty');
        }

        const res = await fetch('https://api.genius.com/search?q=' + search_keyword, {headers: this._auth});
        const body = await res.text();
        const body_parsed = JSON.parse(body);

        if (body_parsed.response.hits.length == 0){
            throw Error('No such song found');
        }; 

        const url = body_parsed.response.hits[0].result.url;
        return url;
    },
    
    /**
     * Get the html source code for the lyrics webpage.
     * 
     * @param {String} song search query
     * @return {String}
     * @private 
     */
    getSourceCode: async function (song){
        const url = await this.getSongURL(song);
        const response = await fetch(url);
        const body = await response.text();
        return body;
    },

    /**
     * Attempts to extract lyrics from body.
     * 
     * @param {String} body from song URL
     * @return {String}     nothing if no lyrics found
     * @private
     */
    extractLyrics: (body) => {
        const body_parsed = cheerio.load(body);
        const lyrics = body_parsed('.lyrics');
        const lyrics_text = cheerio.text(lyrics);
        return lyrics_text;
    },

    /**
     * Get the lyrics.
     * 
     * The webpage containing the lyrics inconsistently returns
     * different html source codes. Some of which are not easily
     * scraped for lyrics. Therefore, we allow for several attempts 
     * at retrieving the lyrics. 
     * 
     * @param {String}  song        song name
     * @param {int}     maxTries    number of attempts, default 3
     * @return {String}             nothing if no lyrics found
     * @public
     */
    getLyrics: async function(song, maxTries=3) {
        for (let i=0; i<maxTries; i++){

            const body = await this.getSourceCode(song);
            const lyrics = await this.extractLyrics(body);

            if (lyrics){
                const name = this.getTitle(body)
                return {name, lyrics};
            };

            console.log('Lyrics not found'); 
        };
    },

    /**
     * Get's song title.
     * 
     * 
     * @param {String} body from song URL
     * @return {String} 
     * @public
     */
    getTitle: (body) => {
        const titleWithStamp = cheerio.text(cheerio.load(body)('title'));
        const re = / Lyrics \| Genius Lyrics/;
        const title = titleWithStamp.replace(re, "");
        return title;
    }

};

module.exports = geniusApi;
