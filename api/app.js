const express = require('express');
require('dotenv').config();
const mongoose = require('./db/mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');

const lyrics = require('./routers/lyrics');
const spotify = require('./routers/spotify');
const user = require('./routers/user');
const login = require('./routers/login');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
// app.use(cors({
//     origin: process.env.CLIENT_BASE_URL
// }));

app.use('/lyrics', lyrics);
app.use('/spotify', spotify);
app.use('/user', user);
app.use('/login', login);

app.get('*', (req, res) => {
    res.status(404).send('Error 404!');
});

const port = process.env.PORT;
app.listen(port, () => {
    console.log('Sever up on port ' + port);
});
