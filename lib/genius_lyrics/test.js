const cheerio = require('cheerio');
const geniusApi = require('./geniusApi');

const token = 'OTh1EYlsNdO1kELVwcevqLPtsgq3FrxfShIXg_w0EaEd8CHZrJWbWvN8Be773Cyr';
const genius = new geniusApi(token);

genius.getLyrics('What a wonderful')
    .then((res) => console.log(res))
    .catch((err) => console.log(err.message));

genius.getLyrics('Wasdfasdfasfasdfasdf')
    .then((res) => console.log(res))
    .catch((err) => console.log(err.message))
