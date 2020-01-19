const router = require('express').Router();
const controllers = require('../controllers');
const auth = require('../utils/auth');
const validate = require('../utils/validator');

router.get('/login', controllers.user.get.login);
router.post('/login', validate.loginValidation, controllers.user.post.login);

router.get('/logout', controllers.user.get.logout);


router.get('/register', controllers.user.get.register);
router.post('/register', validate.loginValidation, controllers.user.post.register);


module.exports = router;