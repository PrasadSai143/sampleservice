const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');

module.exports = function() {
    // winston.handleExceptions(
    //     new winston.transports.Console({
            
    //     }),
    //     new winston.transports.File({ filename: 'uncaughtExceptions.log' })
    // );
  
    // process.on('unhandledRejection', (ex) => {
    //     throw ex;
    // });

    const logConfiguration = {
        'transports': [
            new winston.transports.Console({
                colorize: true, prettyPrint: true
            }),
            new winston.transports.File({
                filename: 'logs/example.log'
            })
        ]
    };
  
    winston.add(new winston.transports.File({ filename: 'logs/example.log' }));
    // winston.add(winston.transports.MongoDB, { 
    //     db: 'mongodb://localhost:27017/RentalDb',
    //     level: 'info'
    // });  
}