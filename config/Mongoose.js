const constants = require("./constants");

const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

module.exports = {
    mongoose : mongoose,
    url : constants.mongodb_url,
    users : require("../app/models/User")(mongoose),
    chatrooms : require("../app/models/ChatRoom")(mongoose),
    chatmessages : require("../app/models/ChatMessage")(mongoose),
    accesstokens : require("../app/models/AccessToken")(mongoose)
};
