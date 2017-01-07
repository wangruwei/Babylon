let mongodb = require('../mongodb');
let Schema   = mongodb.mongoose.Schema;

let UserSchema = new Schema({
	username   : String,
	password   : String,
	createTime : { type: Date, default: Date.now },
	level      : { type: String, default: 10 }
});

let User = mongodb.mongoose.model('user', UserSchema);

let UserDao = function(){};

UserDao.prototype.findByName = (username, fn) => {
	User.findOne({ username: username }, function(err, obj){
		fn(err, obj);
	});
};

UserDao.prototype.save = (obj, fn) => {
	let instance = new User(obj);
	instance.save(function(err, obj){
		fn(err, obj);
	});
};

module.exports = new UserDao();