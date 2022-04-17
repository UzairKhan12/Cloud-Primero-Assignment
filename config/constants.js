require('dotenv').config();

module.exports = {
    mongodb_url: process.env.MONGODB_URL || "mongodb://localhost:27017/assignment",
    server_port: process.env.PORT || 8081,
    base_url: process.env.BASE_URL || 'http://localhost'
};
