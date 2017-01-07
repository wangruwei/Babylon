const express = require('express');

let router = express.Router();

router.get('/', (req, res, next) => {
	req.session.user = null
	return res.redirect('/signin.vpage');
});

module.exports = router;