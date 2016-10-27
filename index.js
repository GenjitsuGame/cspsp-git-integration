'use strict';

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const http = require('http');

const app = express();

app.use(logger('dev'));
app.use(bodyParser());

const prefix = '/cspsp';

app.use(prefix + '/github', require('./routes/github'));

const port = process.env.CGI_PORT || 3100;
http.createServer(app).listen(port);