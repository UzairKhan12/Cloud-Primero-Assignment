const db = require("../../config/Mongoose");
const User = db.users;
const AccessToken = require("./AccessToken");

exports.signUp = async (params) => {

    let user = await new User(params).save();

    user = user.toJSON();

    user.token = await AccessToken.createTokenForUser(user.id);

    delete user.password;

    return user;
}

exports.login = async (params) => {

    let user = await User.findOne({email : params.email}).select('+password');

    if(!user){

        throw "Invalid Email";
    }

    const bcrypt = require('bcrypt');

    let checkPassword = await bcrypt.compare(params.password,user.password);

    if(!checkPassword){

        throw "Invalid Password";
    }

    user = user.toJSON();

    user.token = await AccessToken.createTokenForUser(user.id);

    delete user.password;

    return user;
}

exports.profile = async (params) => {

    let user = await User.findOne({_id : params.other_user_id || params.user_id}).catch(e => console.log(e));

    if(!user){

        throw "Invalid user id";
    }

    return user;
}

exports.getData = async (params) => {

    let query = {_id : {'$ne' : params.user_id}};

    if (params.searchKeyword) {

        const rgx = (pattern) => new RegExp(`.*${pattern}.*`);

        const searchRgx = rgx(params.searchKeyword);

        query['$or'] = [
            { name: { $regex: searchRgx, $options: 'i' } },
            { email: { $regex: searchRgx, $options: 'i' } }
        ];
    }

    return User.find(query);
}

exports.logout = async (params) => {

    await AccessToken.deleteToken(params.user_id);

}


