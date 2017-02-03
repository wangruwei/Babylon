const express = require('express');
const config  = require('config-lite');

let router = express.Router();
let checkLogin = require('../middlewares/check').checkLogin;

router.get('/', checkLogin, (req, res, next) => {
	return res.render('index', {
		params   : {
			appName : 'home',
			appUrl  : '/home.vpage',
			test    : config.test
		}
	});
});

module.exports = router;