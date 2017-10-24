'use strict';

const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');


// pages
const indexPageData = require('./config/pages/index');
const adminPageData = require('./config/pages/admin');
const pageNotFound = require('./config/pages/404');


// user data
const userData = require('./config/user');


// init
const app = express();
app.disable('x-powered-by');

app.set('port', (process.env.PORT || 9090));
app.set('view engine', 'pug')

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-cache');
    next();
});


// routes
app.get('/admin', (req, res) => {
    res.render('admin', adminPageData);
});

app.get('/', (req, res) => {
    res.render('index', indexPageData);
});

app.use((req, res) => {
    res.status(400);
    res.render('404', pageNotFound);
});


// 
app.listen(app.get('port'), () => console.log(`Listening on: http://localhost:${app.get('port')}`));