const express = require('express');
const lyrics = require('./routers/lyrics');
const spotify = require('./routers/spotify');
const dotenv = require('dotenv');
dotenv.config();

const port = process.env.port || 3000
const app = express();

app.use('/lyrics', lyrics);
app.use('/spotify', spotify);

app.get('*', (req, res) =>{
  res.status(404).send('Error 404!');
});

app.listen(port, () => {
  console.log('Sever up on port ' + port);
});
