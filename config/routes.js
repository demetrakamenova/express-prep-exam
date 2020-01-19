const routers = require('../routers');

module.exports = (app) => {
    
    app.use('/home', routers.home);
    app.use('/user', routers.user);
    
    app.use('/course', routers.course);
    app.use('/', routers.home);
    app.use('*', (req, res, next)=>{
        if (req.url === '/static/css/site.css') return next();
        res.send('<h1>This page doesn\'n exist<h1>');
    });
};