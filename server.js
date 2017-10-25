'use strict';

const fs = require('fs');
const path = require('path');
const express = require('express');
const device = require('express-device');
const bodyParser = require('body-parser');

const route = require('./lib/route');

// user data
const userData = require('./config/user');


// init
const app = express();
app.disable('x-powered-by');

app.set('port', (process.env.PORT || 9090));
app.set('view engine', 'pug')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(device.capture());
app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-cache');
    next();
});


// routes
app.get('/admin', (req, res) => route(req, res, 'admin'));

app.get('/', (req, res) => route(req, res, 'main'));


app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res) => {
    res.status(400);
    route(req, res, '404')
});


// 
app.listen(app.get('port'), () => console.log(`Listening on: http://localhost:${app.get('port')}`));