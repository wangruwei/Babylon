const express = require('express');

let router = express.Router();
let checkLogin = require('../middlewares/check').checkLogin;

router.get('/index.vpage', checkLogin, (req, res, next) => {
	return res.render('index', {
		appName  : 'markdown',
		appUrl   : 'markdown/index.vpage',
		params   : JSON.stringify({
			test : true
		})
	});
});

// router.get('/index.vpage', checkLogin, (req, res, next) => {
// 	res.render('test');
// });

module.exports = router;