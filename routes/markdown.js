const express = require('express');
const marked = require('marked');

let router = express.Router();
let checkLogin = require('../middlewares/check').checkLogin;
let MarkdownDao = require('../models/MarkdownModel');

marked.setOptions({
	renderer    : new marked.Renderer(),
	gfm         : true,
	tables      : true,
	breaks      : false,
	pedantic    : false,
	sanitize    : true,
	smartLists  : true,
	smartypants : false
});

router.get('/index.vpage', checkLogin, (req, res, next) => {
	MarkdownDao.findAll((list) => {
		list.forEach((value, index) => {
			value.content = marked(value.content);
		});
		return res.render('index', {
			params   : {
				appName      : 'markdown',
				appUrl       : `markdown${req.url}`,
				test         : true,
				markdownList : list
			}
		});
	});
});

router.get('/article.vpage', checkLogin, (req, res, next) => {
	let articleId = req.query.articleId;
	MarkdownDao.findOne({ _id: articleId }, (err, obj) => {
		if(err){
			return res.json({
				success: false,
				data: {
					info: '网络错误，请稍后再试'
				}
			});
		}else{
			return res.json({
				success: true,
				data: {
					article: obj
				}
			});
		}
	});
});

router.post('/edit.vpage', checkLogin, (req, res, next) => {
	let title     = req.body.title;
	let content   = req.body.content;
	let editType  = req.body.editType;
	let author    = req.session.user.username;
	let articleId = req.body.articleId;

	if(editType == 'add'){
		MarkdownDao.save({
				title   : title,
				content : content,
				author  : author
			},(err, obj) => {
				if(err){
					return res.json({
						success: false,
						info: '网络错误，请稍候重试'
					});
				}else if(obj){
					obj.content = marked(obj.content);
					return res.json({
						success: true,
						data: {
							info: '发布成功!',
							article: obj
						}
					});
				}
			});
		}else if(editType == 'edit'){
			let conditions = { _id: req.body.articleId };
			let update     = { title: req.body.title, content: req.body.content };
			let options    = { upsert: true };
			MarkdownDao.update(conditions, { $set: update }, options, (err, rawResponse) => {
				if(err){
					return res.json({
						success: false,
						data: {
							info: '更新失败'
						}
					});
				}else{
					MarkdownDao.findOne({ _id: articleId }, (err, obj) => {
						if(err){
							return res.json({
								success: false,
								data: {
									info: '网络错误，请稍后再试'
								}
							});
						}else{
							obj.content = marked(obj.content);
							return res.json({
								success: true,
								data: {
									info: '修改成功!',
									article: obj
								}
							});
						}
					});
				}
			});
		}else{
			return res.json({
				success: false,
				data: {
					info: '参数错误'
				}
			});
		}
});

router.get('/search.vpage', checkLogin, (req, res, next) => {
	let title = req.query.title;
	MarkdownDao.findAll((list) => {
		let markdownList = [];
		list.forEach((value) => {
			if(value.title.indexOf(title) != -1){
				value.content = marked(value.content);
				markdownList.push(value)
			}
		});
		return res.json({
			success : true,
			data    : {
				markdownList: markdownList
			}
		});
	});
});

router.post('/delete.vpage', (req, res, next) => {
	let _id = req.body.articleId;
	MarkdownDao.remove(_id, (err) => {
		if(err){
			return res.json({
				success: false,
				data: {
					ind: '删除失败，请稍后重试！'
				}
			});
		}else{
			return res.json({
				success: true,
				data: {
					info: '删除成功！'
				}
			});
		}
	});
});

module.exports = router;