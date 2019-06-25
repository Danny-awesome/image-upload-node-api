const winston = require('winston');

module.exports = function () {
    winston.exceptions.handle(
        new winston.transports.Console({
            colorize: true,
            prettyPrint: true
        })
    );
    winston.add(new winston.transports.File({
        filename: 'logfile.log'
    }));
}