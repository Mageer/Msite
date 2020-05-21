const cheerio = require('cheerio');
const geniusApi = require('./geniusApi');

const token = process.env.GENIUS_TOKEN;
const genius = new geniusApi(token);

genius.getLyrics('What a wonderful')
    .then((res) => console.log(res))
    .catch((err) => console.log(err.message));

genius.getLyrics('Wasdfasdfasfasdfasdf')
    .then((res) => console.log(res))
    .catch((err) => console.log(err.message))
