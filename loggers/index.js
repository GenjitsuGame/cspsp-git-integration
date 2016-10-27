'use strict';

const winston = require('winston');
const logsDir = './logs/';
const fs = require('fs');
const env = process.env.BNBS_DEPLOY_NODE_ENV || 'dev';

if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir);

const operationLogger = {
    dev: new winston.Logger({
        transports: [
            new (winston.transports.File)({
                level: 'info',
                json: true,
                filename: logsDir + 'operation.logs',
                prettyPrint: true
            }),
            new (winston.transports.Console)({
                level: 'debug',
                handleExceptions: true,
                json: false,
                colorize: true
            })
        ]
    }),
    prod: new winston.Logger({
        transports: [
            new (winston.transports.File)({
                level: 'info',
                json: true,
                filename: logsDir + 'operation.logs',
                prettyPrint: true
            })
        ]
    })
}[env];

const accessLogger = {
    dev: new winston.Logger({
        transports: [
            new (winston.transports.File)({
                level: 'info',
                json: true,
                filename: logsDir + 'access.logs',
                prettyPrint: true
            }),
            new (winston.transports.Console)({
                level: 'debug',
                handleExceptions: true,
                json: false,
                colorize: true
            })
        ]
    }),
    prod: new winston.Logger({
        transports: [
            new (winston.transports.File)({
                level: 'info',
                json: true,
                filename: logsDir + 'access.logs',
                prettyPrint: true
            })
        ]
    })
}[env];

operationLogger.stream = {
    write: function(message, encoding){
        operationLogger.info(message);
    }
};

accessLogger.stream = {
    write: function(message, encoding){
        accessLogger.info(message);
    }
};

module.exports = {
    accessLogger: accessLogger,
    operationLogger: operationLogger
};