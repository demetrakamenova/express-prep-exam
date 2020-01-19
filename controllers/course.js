const models = require('../models');
const config = require('../config/config');
const { validationResult } = require('express-validator');

module.exports = {
    get: {
        create: (req, res, next) => {
            const hbsObject = {
                pageTitle: 'Home Page' ,
                //the name of the cookie req.cookies[config.cookie] 
                //check if the user is logged in
                isLoggedIn : req.cookies[config.cookie] !== undefined,
                //get the user from auth.js 
                username:  req.user.username,
            }
            res.render('createCoursePage.hbs', hbsObject);
        },

        details: (req, res, next) => {
            const { id } = req.params;
            const userId = req.user._id;

            models.Course.findById({ _id: id }).then((course) => {
        
                const hbsObject = {
                    course,
                    pageTitle: 'Course Details',
                    isCreator: JSON.stringify(userId) === JSON.stringify(course.creator) ,
                    isLoggedIn : req.cookies[config.cookie] !== undefined,
                    username: req.user.username,
                     isAlreadyEnrolled: course.users.includes(req.user._id),
                }

                res.render('detailsCoursePage.hbs', hbsObject);
            });
        },

        edit: (req, res, next) => {
            const { id } = req.params;
            
            models.Course.findById({ _id: id }).then((course) => {
                const hbsObject = {
                    course,
                    pageTitle: 'Course Edit',
                    isLoggedIn : req.cookies[config.cookie] !== undefined,
                    username: req.user.username
                }

                res.render('editCoursePage.hbs', hbsObject);
            });
        },

        delete: (req, res, next) => {
            const { id } = req.params;
            //you can {_id: id} like an objectId or just id
            models.Course.findByIdAndRemove(id).then((removedCourse) =>{
                res.redirect('/home/');
            });
        },

        enroll: (req, res, next) => {
            const { id } = req.params;
            const userId = req.user._id;
           // console.log('------------------'+ userId);

            models.Course.findByIdAndUpdate({ _id: id }, 
                { $push: { users: userId} })
                .then((course) => {
                    res.redirect(`/course/details/${id}`);
                 }); 
        },
    },

    post: {
        create: (req, res, next) => {
            const { title, description, imageUrl, isPublic } = req.body;
            const errors = validationResult(req);

            if(!errors.isEmpty()){
            
                return res.render('createCoursePage.hbs', {
                    message: errors.array()[0].msg,
                    oldInput: req.body,
                    isLoggedIn : req.cookies[config.cookie] !== undefined,
                    username: req.user.username,
                });
            }

            models.Course
                .create({ title, description, imageUrl, isPublic: isPublic === 'on', creator: req.user.id })
                .then((createdCourse) => {
                        res.redirect('/home/');
                });
        },

        edit: (req, res, next) => {
            const { id } = req.params;
            const { title, description, imageUrl, isPublic } = req.body;
            const errors = validationResult(req);
           
             
            if(!errors.isEmpty()){
                return res.render('editCoursePage.hbs', {
                    message: errors.array()[0].msg,
                    course: req.body,
                    isLoggedIn : req.cookies[config.cookie] !== undefined,
                    username: req.user.username,
                });
            }
                   
            models.Course.findByIdAndUpdate({ _id: id }, 
                { title, description, imageUrl, isPublic: isPublic === 'on' })
                .then((course) => {
                    res.redirect(`/course/details/${id}`);
                 });             
        },
    }
}