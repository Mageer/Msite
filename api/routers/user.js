const express = require("express");
const auth = require("../middleware/auth");
const getUser = require("../middleware/get_user");
const userController = require("../controllers/userController");

const router = new express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/logout", auth, getUser, userController.logout);
router.post("/new-access-token", userController.newAccessToken);
router.get("/me", auth, getUser, userController.me);

module.exports = router;
