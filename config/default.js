module.exports = {
	name       : 'Babylon',
	port       : 3000,
	session    : {
		name   : 'Babylon',
		secret : 'Babylon',
		maxAge : 24 * 3600 * 60 * 1000
	},
	mongodb    : 'mongodb://localhost:27017/Babylon',
	test       : true
};