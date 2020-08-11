const cheerio = require('cheerio');
const geniusApi = require('./geniusApi');
const fs = require('fs');

const token = process.env.GENIUS_TOKEN;
const genius = new geniusApi(token);

const items = [1, 2, 3, 4, 5];

for (const i in items) {
    genius.getSourceCode('Something about you')
        .then((res) => {
            const name = `source${i}.html`;
            fs.writeFile(name, res, function (err) {
                if (err) throw err;
                const lyrics = genius.extractLyrics(res)
                console.log('Saved!');
                console.log(name);
                console.log(lyrics);
            });
        })
        .catch((err) => console.log(err.message));
}

 
