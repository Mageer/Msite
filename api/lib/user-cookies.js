exports.set = async (user, res) => {
  const refresh_token = await user.generateRefreshToken();
  const username = user.username;
  const expires = new Date();
  expires.setMonth(expires.getMonth() + 3);
  res.cookie("username", username, {
    httpOnly: true,
    expires,
    sameSite: "none",
    secure: true,
  });
  res.cookie("refresh_token", refresh_token, {
    httpOnly: true,
    expires,
    sameSite: "none",
    secure: true,
  });
};

exports.clear = (res) => {
  res.clearCookie("username", { httpOnly: true });
  res.clearCookie("refresh_token", { httpOnly: true });
};
