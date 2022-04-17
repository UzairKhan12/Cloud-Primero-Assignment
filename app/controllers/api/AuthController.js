const User = require('../../services/User');
const Helpers = require('../../helpers');

exports.signUp = async (req, res) => {

    let user = await User.signUp(req.body);

    Helpers.sendResponse('Signed Up successfully.', user, res);
}

exports.login = async (req, res) => {

    try {

        let user = await User.login(req.body);

        Helpers.sendResponse('Logged in successfully.', user, res);

    } catch (e) {

        Helpers.sendResponse(e, e, res, 400);
    }
}

exports.profile = async (req, res) => {

    try {

        let user = await User.profile(req.query);

        Helpers.sendResponse('profile fetched successfully.', user, res);

    } catch (e) {

        Helpers.sendResponse(e, e, res, 400);
    }

}

exports.get = async (req, res) => {

    let user = await User.getData(req.query);

    Helpers.sendResponse('users fetched successfully.', user, res);
}

exports.logout = async (req, res) => {

    await User.logout(req.query);

    Helpers.sendResponse('users logged out successfully.', {}, res);
}