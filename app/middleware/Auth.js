const Helpers = require('../helpers');
const AccessToken = require("../services/AccessToken");

module.exports = async (req, res,next) => {

    let access_token = req.header('X-Access-Token');

    try {

        let user_id = await AccessToken.validateAccessToken(access_token);

        if (req.method == 'GET') {

            req.query.user_id = user_id;

        } else {

            req.body.user_id = user_id;

        }

        await next();

    }catch (e){

        return Helpers.sendResponse(e, e, res,401);
    }

}