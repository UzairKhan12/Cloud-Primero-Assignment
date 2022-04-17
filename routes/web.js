//Controllers
const AuthController = require("../app/controllers/web/AuthController.js");
const HomeController = require("../app/controllers/web/HomeController.js");

module.exports = app => {

    var router = require("express").Router();

    router.get("/", HomeController.index);

    router.get("/login", AuthController.login);

    router.get("/register", AuthController.register);

    app.use("/", router);
};
