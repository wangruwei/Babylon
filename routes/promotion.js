const express = require('express');

let router = express.Router();

router.get('/index.vpage', (req, res, next) => {
	return res.render('index', {
		params: {
			appName: 'promotion',
			appUrl: '/promotion/index.vpage',
			params: {
				test: true
			}
		}
	});
});

module.exports = router;