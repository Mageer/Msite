exports.set = async (user, res) => {
  const refresh_token = await user.generateRefreshToken();
  const username = user.username;
  const expires = new Date();
  expires.setMonth(expires.getMonth() + 3);
  res.cookie("username", username, { httpOnly: true, expires });
  res.cookie("refresh_token", refresh_token, { httpOnly: true, expires });
};

exports.clear = (res) => {
  res.clearCookie("username", { httpOnly: true });
  res.clearCookie("refresh_token", { httpOnly: true });
};
