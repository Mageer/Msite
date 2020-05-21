const User = require('../models/user');

const getUser = async (req, res, next) => {
    const username = req.username;
    const user = await User.findOne({ username });

    // Shouldn't be possible.
    if ( !user ) {
        return res.status(400).send('User not found');
    }

    req.user = user;
    next();
}


module.exports = getUser;
