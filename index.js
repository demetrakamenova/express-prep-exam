

//global.__basedir = __dirname; 
const bodyParser = require('body-parser');
//const cookieParser = require('cookie-parser')

require('./config/database')().then(() => {
    const config = require('./config/config');
    const app = require('express')();
   // app.use(cookieParser());
    app.use(bodyParser.urlencoded({ extended: true }));
    require('./config/express')(app);
    require('./config/routes')(app);
    

    app.listen(config.port, console.log(`###Server is ready... Listening on port: ${config.port}...###`));
})