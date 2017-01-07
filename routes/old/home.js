const express = require('express');
const checkLogin = require('../middlewares/check').checkLogin;

let router = express.Router();

router.get('/', checkLogin, (req, res, next) => {
	return res.render('home');
	// return res.render('home');
});

module.exports = router;