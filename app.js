const express    = require('express');
const config     = require('config-lite');
const static     = require('express-static');
const flash      = require('connect-flash');
const session    = require('express-session')
const MongoStore = require('connect-mongo')(session);
const ejs        = require('ejs');
const path       = require('path');
const bodyParser = require('body-parser');
const pkg        = require('./package');
let routes       = require('./routes');

let app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
	name       : config.session.name,
	secret     : config.session.name,
	cookie     : {
		maxAge : config.session.maxAge
	},
	store      : new MongoStore({ // 将session存储到mongodb
		url    : config.mongodb
	})
}));
app.use(flash());

// 设置模板全局常亮
app.locals.blog = {
	title       : pkg.name,
	description : pkg.description
};

// 添加模板必须的三个变量
app.use((req, res, next) => {
	res.locals.user    = req.session.user;
	res.locals.success = req.flash('success').toString();
	res.locals.error   = req.flash('error').toString();
	next();
});

app.use(static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: false }));

routes(app);

app.listen(config.port, () => {
	console.log(`${config.name} is running at port ${config.port}`);
});