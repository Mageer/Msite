const express = require('express');
const lyrics = require('./routers/lyrics');
const spotify = require('./routers/spotify');
const user = require('./routers/user');
const login = require('./routers/login');
const mongoose = require('./db/mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const path = require('path');

const port = process.env.port || 4000
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
// app.use(cors({
//     origin: process.env.CLIENT_BASE_URI
// }));

app.use('/lyrics', lyrics);
app.use('/spotify', spotify);
app.use('/user', user);
app.use('/login', login);

app.get('*', (req, res) => {
    res.status(404).send('Error 404!');
});

app.listen(port, () => {
    console.log('Sever up on port ' + port);
});
