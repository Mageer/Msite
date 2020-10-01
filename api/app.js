const express = require("express");
require("dotenv").config();
const mongoose = require("./db/mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

const lyrics = require("./routers/lyrics");
const spotify = require("./routers/spotify");
const user = require("./routers/user");
const loginWithSpotify = require("./routers/loginWithSpotify");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_BASE_URL,
    credentials: true,
  })
);

app.use("/lyrics", lyrics);
app.use("/spotify", spotify);
app.use("/user", user);
app.use("/login-with-spotify", loginWithSpotify);

app.get("*", (req, res) => {
  res.status(404).send("Error 404!");
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log("Sever up on port " + port);
});
