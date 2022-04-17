require('dotenv').config();

module.exports = {
    mongodb_url: process.env.MONGODB_URL ,
    server_port: process.env.PORT || 8081,
    base_url: process.env.BASE_URL || 'http://localhost'
};
