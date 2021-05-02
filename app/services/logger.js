var winston = require('winston');
var fs = require('fs');

if (!fs.existsSync('logs')) {
    fs.mkdirSync('logs');
}

module.exports = new winston.createLogger({
    transports: [
        new winston.transports.File({
            level: "info",
            filename: "logs/log.log",
            maxsize: 100000,
            maxFiles: 10
        })
    ]
});
