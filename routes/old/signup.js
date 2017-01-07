const express = require('express');
const checkNotLogin = require('../middlewares/check').checkNotLogin;

let UserDao = require('../models/UserModel');

let router = express.Router();

router.get('/', checkNotLogin, (req, res, next) => {
	res.render('signup');
});

router.post('/', checkNotLogin, (req, res, next) => {
	let username = req.body.username;
	let password = req.body.password;
	let repassword = req.body.repassword;

	try{
		if(!username){
			throw new Error('用户名不能为空');
		}
		if(!password){
			throw new Error('密码不能为空');
		}
		if(password != repassword){
			throw new Error('两次输入密码不一致');
		}
		UserDao.save({
			username   : username,
			password   : password,
			level      : 5
		}, (err, obj) => {
			if(err){
				throw new Error('网络错误，请稍候重试');
			}else{
				req.flash('success', '注册成功');
				return res.redirect('/signup.vpage');
			}
		});
	}catch(e){
		req.flash('error', e.message);
		return res.redirect('/signup.vpage');
	}
});

module.exports = router;