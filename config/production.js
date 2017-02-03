const pkg = require('../package');

module.exports = {
	name       : `${pkg.name}`,
	port       : 3000,
	session    : {
		name   : `${pkg.name}`,
		secret : `${pkg.name}`,
		maxAge : 24 * 3600 * 60 * 1000
	},
	mongodb    : `mongodb://localhost:27017/${pkg.name}`,
	env 	   : 'production',
	test       : false
};