const {check} = require('express-validator');

exports.userSignUpValidator = [
    check('name')
        .not()
        .isEmpty()
        .withMessage('Name is required'),
    check('email')
        .isEmail()
        .withMessage('Must be a valid email address'),
    check('password')
        .isLength({min:6})
        .withMessage('Password must be minimum six characters')
];
exports.userSignInValidator = [
    check('email')
        .isEmail()
        .withMessage('Must be a valid email address'),
    check('password')
        .isLength({min:6})
        .withMessage('Password must be minimum six characters')
];