const pkg = require('../package');

process.argv.forEach((val, index) => {
	console.log(`${index}: ${val}`);
});

module.exports = {
	name       : `${pkg.name}`,
	port       : 3000,
	session    : {
		name   : `${pkg.name}`,
		secret : `${pkg.name}`,
		maxAge : 24 * 3600 * 60 * 1000
	},
	mongodb    : process.argv[2] ? `mongodb://${process.argv[2]}@ds035059.mlab.com:35059/babylon` : `mongodb://localhost:27017/${pkg.name}`,
	env 	   : 'production',
	test       : false
};