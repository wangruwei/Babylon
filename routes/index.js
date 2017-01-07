const config = require('config-lite');

module.exports = (app) => {
	let toIndex = (res, appName) => {
		return res.render('index', {
			params: {
				appName : appName,
				test    : config.test
			}
		});
	};
	app.get('/', (req, res, next) => {
		res.redirect('/home.vpage');
	});

	app.use('/home.vpage', require('./home'));
	app.use('/markdown', require('./markdown'));
	app.use('/', require('./auth'));

	app.use(function(req, res) {
	    if (!res.headersSent) {
	        res.render('404');
	    }
	});
}