const router     = require('express').Router();
const User       = require('@model/User');
const validation = require('@validation/user');
const bcrypt     = require('bcryptjs');
const jwt        = require('jsonwebtoken');

// REGISTER
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

// LOGIN
router.post('/login', validation.loginValidation, async(req, res) => {
	// Validate Data
	const errors = validation.validate(req);
	if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
	// Checking if the email exists
	const user = await User.findOne({email: req.body.email});
	if(!user) return res.status(400).send('Email is not found');
	// Password is Correct
	const validPass = await bcrypt.compare(req.body.password, user.password);
	if(!validPass) return res.status(400).send('Invalid Password');
	// Create and Assign a token
	const token = jwt.sign({_id: user.id}, process.env.TOKEN_SECRET);
	res.header('auth-token', token).send(token);
	// Success
	// res.send('Logged in!');
});

module.exports = router;
