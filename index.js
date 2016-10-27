'use strict';

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const http = require('http');
const accessLogger = require('./loggers').accessLogger;
const operationLogger = require('./loggers').operationLogger;

const app = express();

app.use(logger('combined', { 'stream': accessLogger.stream }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const prefix = '/cspspc';

app.use(prefix + '/github', require('./routes/github'));

const port = process.env.CGI_PORT || 3101;
const server = http.createServer(app)
server.on('listening', () => operationLogger.info('Listening on ' + port));

server.listen(port);