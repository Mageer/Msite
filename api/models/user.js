const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cryptoRandomString = require('crypto-random-string');
const thirdPartyTokenGenerator = require('../lib/third_party_token_generator');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 6,
    },
    refresh_token: {
        type: String,
    },
    spotify_refresh_token: {
        type: String,
    }
}, {
    timestamps: true
}
);


userSchema.pre('save', async function() {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 10);
    }
});


userSchema.statics.findUser = async (username) => {
    const user = await User.findOne({ username });
    if ( !user ) {
        throw new Error('User not found');
    }
    return user;
}

userSchema.statics.compareWithHashedKey = async (unhashed, hashed) => {
    if ( !hashed ) {
        throw new Error('Unauthorized');
    }

    const match = await bcrypt.compare(unhashed, hashed);
    if ( !match ){
        throw new Error('Unauthorized');
    }
}


userSchema.statics.findByUsernameAndPassword = async (username, password) => {
    const user = await User.findUser(username);
    await User.compareWithHashedKey(password, user.password);
    return user;
}


userSchema.statics.findByUsernameAndRefreshToken = async (username, refresh_token) => {
    const user = await User.findUser(username);
    await User.compareWithHashedKey(refresh_token, user.refresh_token);
    return user;

}


userSchema.methods.generateRefreshToken = async function () {
    const user = this; 
    const refresh_token = cryptoRandomString({length: 32, type: 'base64'});
    user.refresh_token = await bcrypt.hash(refresh_token, 10);
    await user.save();
    return refresh_token;
}


userSchema.methods.generateJWT = function (tokens) {
    const user = this;

    const token = jwt.sign({
        username: user.username,
        tokens,
        }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return token;
}


userSchema.methods.generateAccessToken = async function () {
    const user = this;

    const tokens = {};
    // Potential for adding more 3rd party tokens.
    if ( user.spotify_refresh_token ){
        tokens.spotify = await thirdPartyTokenGenerator.spotifyAccessToken(user);
    }

    const user_access_token = user.generateJWT(tokens);
    return user_access_token;
}


userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.refresh_token;
    delete userObject.spotify_refresh_token;
    delete userObject._id;
    delete userObject.__v;
    return userObject;
}


userSchema.plugin(uniqueValidator);
const User = mongoose.model('User', userSchema);

module.exports = User;
