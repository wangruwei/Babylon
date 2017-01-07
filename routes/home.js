const express = require('express');

let router = express.Router();
let checkLogin = require('../middlewares/check').checkLogin;

router.get('/', checkLogin, (req, res, next) => {
	return res.render('index', {
		appName  : 'home',
		appUrl   : '/home.vpage',
		params   : JSON.stringify({
			test : true
		})
	});
});

module.exports = router;