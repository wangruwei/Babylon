const express = require('express');

let router = express.Router();
let checkLogin = require('../middlewares/check').checkLogin;
let MarkdownDao = require('../models/MarkdownModel');

router.get('/index.vpage', checkLogin, (req, res, next) => {
	MarkdownDao.findAll((list) => {
		return res.render('index', {
			params   : {
				appName  : 'markdown',
				appUrl   : `markdown${req.url}`,
				test: true,
				list: list
			}
		});
	});
});

router.post('/edit.vpage', checkLogin, (req, res, next) => {
	let title   = req.body.title;
	let content = req.body.content;
	let author  = req.session.user.username;

	MarkdownDao.save({
		title   : title,
		content : content,
		author  : author
	}, (err, obj) => {
		if(err){
			return res.json({
				success: false,
				info: '网络错误，请稍候重试'
			});
		}else if(obj){
			return res.json({
				success: true,
				data: {
					obj: obj
				}
			});
		}
	});
});

module.exports = router;