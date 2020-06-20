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
     * Extract lyrics from the second source code.
     * 
     * The webpage containing the lyrics inconsistently returns
     * different html source codes. This parses the more complicated
     * lyrics source code.
     * 
     * @param {String} $ loaded body through cheerio
     * @return {String}     the lyrics
     * @private
     */
    parseOtherSourceCode: ($) => {
        const div = ".SongPageGrid-sc-1vi6xda-0.DGVcp.Lyrics__Root-sc-1ynbvzw-0.jvlKWy";
    
        // Magic
        const str = $(div).html();
        if ( !str ) {
            return {};
        }
        const regex = /<br\s*[\/]?>/gi;
        $(div).html(str.replace(regex, "\n"));
        
        const lyrics = $(div).text();
        return lyrics;
    },

    /**
     * Extract lyrics from body.
     * 
     * @param {String} body from song URL
     * @return {String}     nothing if no lyrics found
     * @private
     */
    extractLyrics: function(body) {
        const $ = cheerio.load(body);

        // Attempt easy lyrics extraction
        let lyrics = $('.lyrics').text();
        if ( !lyrics ) {
            lyrics = this.parseOtherSourceCode($);
        }
        return lyrics;
    },

    /**
     * Get's song title.
     * 
     * @param {String} body from song URL
     * @return {String} 
     * @private
     */
    extractTitle: (body) => {
        const titleWithStamp = cheerio.text(cheerio.load(body)('title'));
        const re = / Lyrics \| Genius Lyrics/;
        const title = titleWithStamp.replace(re, "");
        return title;
    },

    /**
     * Get's the song title and lyrics.
     * 
     * @param {String} song search query
     * @return {Object}     title and lyrics
     * @public
     */
    getLyrics: async function(song) {
        const body = await this.getSourceCode(song);
        const lyrics = this.extractLyrics(body);
        const name = this.extractTitle(body);
        return ({ name, lyrics });
    }
};


module.exports = geniusApi;
