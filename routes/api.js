//Request Validator
const validateRequest = require('../app/validations/ValidateRequest')

//Middleware
const AuthMiddleware = require('../app/middleware/Auth');

//Controllers
const AuthController = require("../app/controllers/api/AuthController.js");

//Validators
const AuthValidator = require('../app/validations/Auth');

module.exports = app => {

    var router = require("express").Router();

    router.post("/signup",AuthValidator.signUp(),validateRequest, AuthController.signUp);

    router.post("/login",AuthValidator.login(),validateRequest, AuthController.login);

    router.delete("/logout",AuthMiddleware, AuthController.logout);

    router.get("/profile",AuthMiddleware, AuthController.profile);

    router.get("/users",AuthMiddleware, AuthController.get);

    app.use("/api", router);
};
