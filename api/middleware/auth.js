const jwt = require('jsonwebtoken');

const userAuth = async (req, res, next) => {
    // TODO: Test when no Authorization header.
    try {
        const jwt_token = req.query.state || req.header('Authorization').replace('Bearer ', '');
        const decoded = await jwt.verify(jwt_token, process.env.JWT_SECRET);
        req.username = decoded.username;
        req.tokens = decoded.tokens;
        req.jwt_token = jwt_token;
        next();

    } catch(err) {
        res.status(400).send(err.message);
        return;
    }
}

module.exports = userAuth;