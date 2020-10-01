const express = require("express");
const router = new express.Router();
const lyricsController = require("../controllers/lyricsController");

router.get("/", lyricsController.lyrics);

module.exports = router;
