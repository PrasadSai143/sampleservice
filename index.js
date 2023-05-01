const winston = require('winston')
const express = require('express');
var app = express();
process.env.NODE_CONFIG = '{"jwtPrivateKey": "mytestkey"}';
require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    winston.log('info',`Listening on port ${port}`)
})

module.exports = server;