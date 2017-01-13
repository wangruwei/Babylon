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

// MarkdownDao.prototype.findById = (id, fn) => {
// 	Markdown.findOne({ _id: id }, (err, obj) => {
// 		fn(err, obj);
// 	});
// };
MarkdownDao.prototype.findOne = (condition, fn) => {
	Markdown.findOne(condition, (err, obj) => {
		fn(err, obj);
	});
};
MarkdownDao.prototype.findAll = (fn) => {
	Markdown
		.find({})
		.sort({ '_id': -1 })
		.exec((err, arr) => {
			fn(arr);
	});
};
MarkdownDao.prototype.save = (obj, fn) => {
	let instance = new Markdown(obj);
	instance.save((err, obj) => {
		fn(err, obj);
	});
};
MarkdownDao.prototype.update = (condition, update, options, fn) => {
	Markdown.update(condition, update, options, (err, rawResponse) => {
		fn(err, rawResponse);
	});
};
MarkdownDao.prototype.remove = (id, fn) => {
	Markdown.remove({ _id: id }, (err) => {
		fn(err);
	});
}

module.exports = new MarkdownDao();