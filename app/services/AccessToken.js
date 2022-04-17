const db = require("../../config/Mongoose");
const AccessToken = db.accesstokens;
const User = db.users;
const Helpers = require('../helpers');

exports.createTokenForUser = async (user_id) => {

    await AccessToken.deleteMany({ user_id: user_id });

    let accessToken = new AccessToken({
        'token': Helpers.generateUUID(),
        'user_id': user_id,
        'expiration': Date.now() + 365 * 24 * 60 * 60 * 1000,
    });

    await accessToken.save();

    return accessToken.token;
}

exports.deleteToken = async (user_id) => {

    await AccessToken.deleteMany({ user_id: user_id });
}

exports.validateAccessToken = async (access_token) => {

    if (!access_token) {

        throw "X-Access-Token is required";
    }

    let access_token_data = await AccessToken.findOne({ token: access_token });

    if (!access_token_data || Date.now() > access_token_data.expiration) {

        throw "Invalid X-Access-Token";
    }

    let user = await User.findOne({
        _id: access_token_data.user_id,
    });

    if (!user) {

        throw "User does not exist";
    }

    return user.id;
}

