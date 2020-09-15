const setUserCookies = async (user, res) => {
    const refresh_token = await user.generateRefreshToken();
    const username = user.username;
    const path = `${process.env.SERVER_BASE_URL}/user/new-access-token`;
    res.cookie('username', username, { path, httpOnly: true })
    res.cookie('refresh_token', refresh_token, { path, httpOnly: true });
} 

module.exports = setUserCookies;
