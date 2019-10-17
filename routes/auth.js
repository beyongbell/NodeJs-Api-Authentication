const router = require('express').Router();
const User   = require('@model/User');
const { check, validationResult } = require('express-validator');

// Validation
const validation = [
	check('name')
	.isString().withMessage('Is String')
	.isLength({ min: 6 }).withMessage('must be at least 6 chars long'),
	check('email').isLength({ min: 6 }).isEmail(),
	check('password').isLength({ min: 6 })
]

router.post('/register', validation, async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
	// res.send(errors.errors[0].msg);
	const user = new User({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password
	});
	try {
		const savedUser = await user.save();
		res.send(savedUser);
	} catch (error) {
		res.status(400).send(error);
	}
});

module.exports = router;
