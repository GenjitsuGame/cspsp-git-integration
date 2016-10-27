'use strict';

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const http = require('http');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const prefix = '/cspspc';

app.use(prefix + '/github', require('./routes/github'));

const port = process.env.CGI_PORT || 3101;
http.createServer(app).listen(port);