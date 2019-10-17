const router   = require('express').Router();
const User     = require('@model/User');
const validation = require('@validation/user');
const bcrypt   = require('bcryptjs');

router.post('/register', validation.registerValidation, async (req, res) => {
	const errors = validation.validate(req);
	// res.send(errors.errors[0].msg);
	if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

	// Checking if user is already in the database
	const emailExist = await User.findOne({email: req.body.email});
	if(emailExist) return res.status(400).send('Email already Exist');

	// Hash passwords
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(req.body.password, salt);

	// Create a new User
	const user = new User({
		name: req.body.name,
		email: req.body.email,
		password: hashedPassword
	});
	try {
		const savedUser = await user.save();
		res.send({user: user._id});
	} catch (error) {
		res.status(400).send(error);
	}
});

module.exports = router;
