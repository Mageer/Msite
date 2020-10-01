const User = require("../models/user");
const userCookies = require("../lib/user-cookies");

exports.register = async (req, res) => {
  try {
    const user = new User(req.body);
    await userCookies.set(user, res);
    const access_token = await user.generateAccessToken();
    res.send({ access_token });
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findByUsernameAndPassword(
      req.body.username,
      req.body.password
    );
    await userCookies.set(user, res);
    const accessToken = await user.generateAccessToken();
    res.send({ accessToken });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

exports.logout = async (req, res) => {
  const user = req.user;
  try {
    user.refresh_token = undefined;
    await user.save();
    userCookies.clear(res);
    res.send({});
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

exports.newAccessToken = async (req, res) => {
  try {
    const refresh_token = req.cookies.refresh_token;
    const username = req.cookies.username;
    const user = await User.findByUsernameAndRefreshToken(
      username,
      refresh_token
    );
    const accessToken = await user.generateAccessToken();
    res.send({ username, accessToken });
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.me = (req, res) => {
  res.send(req.user);
};
