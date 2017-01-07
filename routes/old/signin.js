const express = require('express');
const checkNotLogin = require('../middlewares/check').checkNotLogin;

let UserDao = require('../models/UserModel');

let router = express.Router();

router.get('/', checkNotLogin, (req, res, next) => {
	return res.render('signin');
});

router.post('/', checkNotLogin, (req, res, next) => {
	let username = req.body.username;
	let password = req.body.password;

	try{
		if(!username){
			throw new Error('请输入用户名');
		}
		if(!password){
			throw new Error('请输入密码');
		}
		UserDao.findByName(username, (err, user) => {
			if(!user){
				req.flash('error', '用户不存在');
				return res.redirect('back');
			}
			// 检查密码是否匹配
			if(password !== user.password){
				req.flash('error', '用户名或密码错误');
				return res.redirect('back');
			}
			req.flash('success', '登录成功');
			// 用户信息写入session
			delete user.password
			req.session.user = user;
			// 跳转到主页
			res.redirect('/home.vpage');
		});
	}catch(e){
		req.flash('error', e.message);
		return res.redirect('/signin.vpage');
	}
});

module.exports = router;