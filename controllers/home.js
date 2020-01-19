const config = require('../config/config');
const models = require('../models');

module.exports = {
    get: {
        home: (req, res, next) => {
            let username = undefined;
            if (req.user) {
                username = req.user.username;
            }

            models.Course.find().sort({
                createdAt: 'desc'
            }).then((courses) => {

                let isLoggedIn= req.cookies[config.cookie] !== undefined;

                let filteredCourses = Array.from(courses).map(x => {
                    x.createdAtFormated = (new Date(x.createdAt)).toLocaleString();
                    return x;
                });

                if(isLoggedIn && username){
                    filteredCourses = filteredCourses
                        .filter(course => course.isPublic || course.creator.toString() === req.user._id.toString());
                }else {

                    filteredCourses = filteredCourses
                        .filter(course => course.isPublic)
                        .filter((course, i) => {
                            return i < 3;
                        });
                }
           
                const hbsObject = {
                    pageTitle: 'Home Page',
                    //the name of the cookie req.cookies[config.cookie] 
                    //check if the user is logged in
                    isLoggedIn,
                    //get the user from auth.js 
                    username: username,
                    filteredCourses
                }

               res.render('homePage.hbs', hbsObject);
            });
        }
    },
};