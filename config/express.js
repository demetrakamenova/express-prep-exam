const express = require('express');
//const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const handlebars = require('express-handlebars');
const path = require('path');


module.exports = (app) => {
    app.engine('hbs', handlebars({
        layoutsDir: 'views',
        defaultLayout: 'main-layout',
        partialsDir: 'views/partials',
        extname: 'hbs'
    }));

    app.set('view engine', 'hbs');
    //app.use(express.static('../static'));
    
    app.use('/course/static', express.static(path.join(__dirname, '../static')));
    app.use('/static', express.static(path.join(__dirname, '../static')));
    app.use(cookieParser());
   // app.use(bodyParser.urlencoded({ extended: true }));
};