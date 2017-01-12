let mongodb = require('../mongodb');
let Schema   = mongodb.mongoose.Schema;

let MarkdownSchema = new Schema({
	title      : String,
	content    : String,
	author 	   : String,
	createTime : { type: Date, default: Date.now }
});

let Markdown = mongodb.mongoose.model('markdown', MarkdownSchema);

let MarkdownDao = function(){};

MarkdownDao.prototype.findByName = () => {
	Markdown.findOne({ title: title }, (err, obj) => {
		fn(err, obj);
	});
};
MarkdownDao.prototype.findAll = (fn) => {
	Markdown.find((err, arr) => {
		fn(arr);
	});
};
MarkdownDao.prototype.save = (obj, fn) => {
	let instance = new Markdown(obj);
	instance.save((err, obj) => {
		fn(err, obj);
	});
};

module.exports = new MarkdownDao();