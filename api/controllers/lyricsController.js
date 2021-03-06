const geniusApi = require("../lib/genius_lyrics/geniusApi");
const token = process.env.GENIUS_TOKEN;
const genius = new geniusApi(token);

exports.lyrics = async (req, res) => {
  try {
    const lyrics = await genius.getLyrics(req.query.search, (maxTries = 5));

    if (!lyrics || !lyrics.lyrics) {
      console.log("Lyrics not found");
      return res.status(400).send("Lyrics not found");
    }

    res.send(lyrics);
  } catch (err) {
    console.log(err.message);
    res.status(400).send("Something went wrong");
  }
};
