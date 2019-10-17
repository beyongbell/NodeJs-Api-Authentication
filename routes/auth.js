const router = require('express').Router();
const User   = require('@model/User');

router.post('/register', (req, res) => {
	res.send('Register');
});

module.exports = router;
