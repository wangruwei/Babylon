const express = require('express');

let router        = express.Router();
let checkNotLogin = require('../middlewares/check').checkNotLogin;
let UserDao       = require('../models/UserModel');


router.get('/index.vpage', checkNotLogin, (req, res, next) => {
	return res.render('index', {
		appName  : 'auth',
		appUrl   : req.url,
		params   : JSON.stringify({
			test : true
		})
	});
});

// 登出
router.get('/logout.vpage', (req, res, next) => {
	req.session.user = null;
	return res.redirect('/index.vpage');
});

// 登录
router.post('/login.vpage', checkNotLogin, (req, res, next) => {
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
				return res.json({
					success: false,
					info: '用户不存在'
				});
			}
			// 检查密码是否匹配
			if(password !== user.password){
				return res.json({
					success: false,
					info: '用户名或密码错误'
				});
			}
			// 用户信息写入session
			delete user.password
			req.session.user = user;
			// 跳转到主页
			return res.json({
				success: true,
				data: {
					url: '/home.vpage'
				}
			});
		});
	}catch(e){
		res.status(200);
		return res.json({
			success : false,
			info    : e.message
		});
	}
});

// 注册
router.post('/register.vpage', checkNotLogin, (req, res, next) => {
	let username   = req.body.username;
	let password   = req.body.password;
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
		UserDao.findByName(username, (err, user) => {
			if(err){
				return res.json({
					success: false,
					info: '网络错误，请稍候重试'
				});
			}else{
				if(user){
					return res.json({
						success: false,
						info: '用户名已存在'
					});
				}else{
					UserDao.save({
						username   : username,
						password   : password,
						level      : 5
					}, (err, obj) => {
						if(err){
							return res.json({
								success : false,
								info    : '网络错误，请稍候重试'
							});
						}else{
							delete obj.password;
							req.session.user = obj;
							return res.json({
								success: true,
								data: {
									url: '/home.vpage'
								}
							});
						}
					});
				}
			}
		});

	}catch(e){
		return res.json({
			success : false,
			info    : e.message
		});
	}
});

module.exports = router;