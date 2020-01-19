const {
    body
} = require('express-validator');

const loginValidation = [
    body('username', 'Username should be at least 5 simbols and contain only letters and digits')
    .isLength({
        min: 5
    })
    .isAlphanumeric(),

    body('password', 'Password should be at least 5 simbols.')
    .isLength({
        min: 5
    })
    .isAlphanumeric(),
];

const createAndUpdateValidation = [

    // body('title', 'Title should be at least 5 simbols.')
    // .isLength({
    //     min: 5
    // })
    // .isAlphanumeric(),

    // body('description', 'Description shpuld be max 50 simbols')
    // .isLength({
    //     max: 50
    // })
    // .isAlphanumeric(),

    // body('imageUrl')
    // .custom((value) => {
    //     //console.log(value);
    //     if (!value.startsWith('http') || !value.startsWith('https')) {
    //         throw new Error('Image url should start with http or https.');
    //     }

    //     return true;
    // }),
];

module.exports = {
    createAndUpdateValidation,
    loginValidation,
}