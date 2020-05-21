const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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


userSchema.statics.findByCredentials = async (username, password) => {
    const user = await User.findOne({ username });
    if ( !user ) {
        throw new Error('No such user found');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if ( !passwordMatch ){
        throw new Error('Incorrect password.');
    }

    return user;
}


userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.spotify_refresh_token;
    delete userObject._id;
    delete userObject.__v;
    return userObject;
}


userSchema.methods.generateJWT = function (tokens) {
    const user = this;
    
    const token = jwt.sign({
        username: user.username,
        tokens,
    },
        process.env.JWT_SECRET, { expiresIn: '1h' });

    return token;
}


userSchema.plugin(uniqueValidator);
const User = mongoose.model('User', userSchema);

module.exports = User;
