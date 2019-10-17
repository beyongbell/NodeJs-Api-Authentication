const { check, validationResult } = require('express-validator');

const validate = (req) => { return validationResult(req) }

const registerValidation = [
	check('name')
	.isString().withMessage('Is String')
	.isLength({ min: 6 }).withMessage('must be at least 6 chars long'),
	check('email').isLength({ min: 6 }).isEmail(),
	check('password').isLength({ min: 6 })
]

const loginValidation = [
	check('email').isLength({ min: 6 }).isEmail(),
	check('password').isLength({ min: 6 })
]

module.exports = {
	validate,
	registerValidation,
	loginValidation
}