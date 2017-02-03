const express = require('express');
const config  = require('config-lite');

let router = express.Router();

router.get('/index.vpage', (req, res, next) => {
	return res.render('index', {
		params: {
			appName: 'promotion',
			appUrl: '/promotion/index.vpage',
			params: {
				test: config.test
			}
		}
	});
});

module.exports = router;