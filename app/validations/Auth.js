const {check} = require('express-validator')

exports.signUp = () => {

    return [
        check('name', "name is required").not().isEmpty(),
        check('password').not().isEmpty().withMessage("password is required").isLength({min : 8}).withMessage("password length must've at least 8 characters"),
        check('email').not().isEmpty().withMessage("email is required").isEmail().withMessage("Invalid email").custom(value => {

            const db = require("../../config/Mongoose");
            const User = db.users;

            return User.findOne({email : value}).then(user => {
                if (user) {
                    return Promise.reject('email already in use');
                }
            });
        })
    ]
}

exports.login = () => {
    return [
        check('password', "password is required").not().isEmpty(),
        check('email').not().isEmpty().withMessage("email is required").isEmail().withMessage("invalid email")
    ]
}