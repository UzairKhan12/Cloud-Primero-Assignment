const { validationResult } = require('express-validator');
const Helpers = require('../helpers');

module.exports = (req,res,next) => {

    let errors = validationResult(req);

    if (!errors.isEmpty()) {

        return Helpers.sendValidationErrorMessage(errors.array(),res);
    }

    next();
}