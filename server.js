const express = require("express");
const path = require('path');
const multer = require('multer')();

const app = express();

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));

app.use(multer.array());

const db = require("./config/Mongoose");
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });


require("./routes/api")(app);
require("./routes/web")(app);

const constants = require("./config/constants");

app.locals.baseUrl = constants.base_url + ':' + constants.server_port

app.set('view engine', 'ejs');

app.use('/assets',express.static(path.join(__dirname, 'assets')))

// set port, listen for requests
const PORT = constants.server_port || 8081;
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

require("./config/socket")(server);
