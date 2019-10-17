const router = require('express').Router();
const User = require('./');
router.post('/register', (req, res) => {
	res.send('Register');
});

module.exports = router;
