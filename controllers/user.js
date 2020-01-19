const models = require('../models');
const jwt = require('../utils/jwt');
const config= require('../config/config');
const { validationResult } = require('express-validator');

module.exports = {
    get: {
        login: (req, res, next) => {
            res.render('loginPage.hbs', { pageTitle: 'Login Page' });
        },

        register: (req, res, next) => {
            res.render('registerPage.hbs', { pageTitle: 'Register Page' });
        },

        logout: (req, res) =>{
            res.clearCookie(config.cookie).redirect('/home/');
        },
    },

    post: {

        login: (req, res, next) => {
                const { username, password } = req.body;
                const errors = validationResult(req);

                if(!errors.isEmpty()){
            
                    return res.render('loginPage.hbs', {
                        message: errors.array()[0].msg,
                        oldInput: req.body,
                    });
                    
                } 
                //return a model user 
                models.User.findOne( { username } ).then((foundUser) =>{
                        //check if the current user has the same password from the same user from the database
                    Promise.all([foundUser, foundUser.matchPassword(password)])
                        .then(([user, match]) => {
                            if(!match){
                                throw new Error('Password is invalid');
                            }
                            const token = jwt.createToken({ id: user._id });
                    
                            res.cookie(config.cookie, token)
                                .redirect('/home/',);
                        });
                    
                }).catch(err => {
                    res.render('loginPage.hbs', {
                        message: 'Wrong pass or username',
                        oldInput: req.body,
                    });
                });
        },

        register: (req, res, next) =>{
            //get the data from the form body-parser used
            const { username, password, repeatPassword } = req.body;
            const errors = validationResult(req);

            if(!errors.isEmpty()){
            
                return res.render('registerPage.hbs', {
                    message: errors.array()[0].msg,
                    oldInput: req.body,
                });
            } 

            if (password !== repeatPassword) {

                return res.render('registerPage.hbs', {
                    message: 'Password and repeat password don\'t match!'
                });
              }
            

            models.User.create({ username, password }).then((registeredUser) => {
              
                const token = jwt.createToken({ id: registeredUser._id });
                
                res.cookie(config.cookie, token)
                    .redirect('/home/',);
            });
        }
    },
};