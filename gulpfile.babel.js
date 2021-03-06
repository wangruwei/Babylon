'use strict';
import gulp         from 'gulp';
import sass         from 'gulp-ruby-sass';
import sourcemaps   from 'gulp-sourcemaps';
import path         from 'path';
import md5          from 'gulp-md5-plus';
import rev          from 'gulp-rev';
import collector    from 'gulp-rev-collector';
import uglify		from 'gulp-uglify';
import minify 		from 'gulp-clean-css';
import htmlmin      from 'gulp-htmlmin';
import rename       from 'gulp-rename';
import replace 		from 'gulp-replace';
import concat       from 'gulp-concat';
import fs 			from 'fs';
import clean 		from 'gulp-clean';

let _config = {
	sassRoot        : path.join(__dirname, 'public/css/'),
	cssRoot         : path.join(__dirname, 'public/css/'),
	ejsRoot         : path.join(__dirname, 'views/'),
	toolsRoot       : path.join(__dirname, 'public/js/tools/'),
	libRoot         : path.join(__dirname, 'public/js/lib/'),
	appsRoot        : path.join(__dirname, 'public/js/apps/'),
	jsRoot          : path.join(__dirname, 'public/js/'),
	base_configRoot : path.join(__dirname, 'public/js/')
};

// compile sass
gulp.task('sass', () => {
	return sass(`${_config.sassRoot}**/*.scss`, { sourcemap: true })
		.on('error', sass.logError)
		.pipe(sourcemaps.write('maps', {
			includeContent: false,
			sourceRoot: `${_config.sassRoot}maps`
		}))
		.pipe(gulp.dest(_config.sassRoot));
});

// uglify js
gulp.task('js', ['clean'], () => {
	return gulp.src([
			`${_config.appsRoot}**/*.js`,
			`${_config.jsRoot}*.js`,
			`${_config.toolsRoot}*.js`,
			`${_config.libRoot}*/*/*.js`
		], {base: 'public'})
		.pipe(rev())
		.pipe(uglify())
		.pipe(rename((path) => {
			if(path.basename.indexOf('.min') == -1){
				path.basename += '.min';
			}
		}))
		.pipe(gulp.dest('public'))
		.pipe(rev.manifest({
			path  : 'public/js/rev-manifest.json',
			base  : '',
			cwd   : '',
			merge : true
		}))
		.pipe(gulp.dest(''));
});
// minify css
gulp.task('css', ['clean'], () => {
	return gulp.src([`${_config.sassRoot}**/*.css`, `${_config.libRoot}*/*/*.css`], { base: 'public' })
		.pipe(rev())
		.pipe(minify())
		.pipe(rename((path) => {
			if(path.basename.indexOf('.min') == -1){
				path.basename += '.min';
			}
		}))
		.pipe(gulp.dest('public'))
		.pipe(rev.manifest({
			path  : 'public/js/rev-manifest.json',
			base  : '',
			cwd   : '',
			merge : true
		}))
		.pipe(gulp.dest(''));
});

// minify html
gulp.task('htmlmin', ['clean'], () => {
	return gulp.src('public/js/apps/**/*.html', { base: 'public' })
		.pipe(rev())
	    .pipe(htmlmin({
	    	collapseWhitespace: true,
	    	removeComments: false
	    }))
	    .pipe(rename((path) => {
	    	if(path.basename.indexOf('.min') == -1){
	    		path.basename += '.min';
	    	}
	    }))
	    .pipe(gulp.dest('public'))
	    .pipe(rev.manifest({
	    	path  : 'public/js/rev-manifest.json',
	    	base  : '',
	    	cwd   : '',
	    	merge : true
	    }))
	    .pipe(gulp.dest(''));;
});


// mapping
gulp.task('collector', ['js', 'css', 'htmlmin'], () => {
	return gulp.src(['public/js/*.json', 'views/**/*.ejs'])
		.pipe(collector({
			replaceReved: true,
			revSuffix: '-[0-9a-f]{8,10}.min-?'
		}))
		.pipe(gulp.dest('views/'));
});

gulp.task('changePath', ['collector'], () => {
	return gulp.src('public/js/base_config-*.js')
		.pipe(replace(/"\/js(\/[^/^'^"]+)+\/[^/^'^"]+"/g, (str) => {
			return `requirejs.changePath(modules, ${str})`;
		}))
		.pipe(gulp.dest('public/js'));
});


// inject config
gulp.task('inject', ['changePath'], () => {
	let modules = JSON.parse(fs.readFileSync('public/js/rev-manifest.json', 'utf8'));
	let configName = modules['js/base_config.js'].split('/')[1];
	return gulp.src(['public/js/rev-manifest.json', path.join('public/js', configName)])
		.pipe(concat(configName), { newLine: ';' })
		.pipe(replace(/^{/, 'modules = {'))
		.pipe(replace(/^}/, '};'))
		.pipe(uglify())
		.pipe(gulp.dest('public/js/'));
});

// clean
gulp.task('clean js', () => {
	return gulp.src([`${_config.appsRoot}**/*-*.min.js`, `${_config.jsRoot}*-*.min.js`, `${_config.toolsRoot}*-*.min.js`, `${_config.libRoot}*/*/*-*.min.js`], { read: false })
		.pipe(clean());
});
gulp.task('clean css', () => {
	return gulp.src([`${_config.sassRoot}**/*-*.min.css`, `${_config.libRoot}*/*/*.min.css`], { read: false })
		.pipe(clean());
});
gulp.task('clean html', () => {
	return gulp.src('public/js/apps/**/*-*.min.html', { read: false })
		.pipe(clean());
});

gulp.task('clean collector', () => {
	return gulp.src(['views/scripts/script.ejs', 'views/links/link.ejs'], { base: 'views' })
		.pipe(replace(/-[0-9a-f]{8,10}.min-?/g, ''))
		.pipe(gulp.dest('views'));
});

gulp.task('clean', ['clean js', 'clean css', 'clean html', 'clean collector'], () => {
	return gulp.src('public/js/rev-manifest.json', { read: false })
		.pipe(clean());
});
// tasks
gulp.task('watch', ['sass'], () => {
	return gulp.watch(`${_config.sassRoot}**/*.scss`, ['sass']);
});

gulp.task('build', ['inject']);

gulp.task('default', ['sass']);
