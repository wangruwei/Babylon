'use strict';
import gulp         from 'gulp';
import sass         from 'gulp-ruby-sass';
import sourcemaps   from 'gulp-sourcemaps';
import path         from 'path';
import md5          from 'gulp-md5-plus';
import rev          from 'gulp-rev';
import collector    from 'gulp-rev-collector';
// import minifyCss from 'minify-css';
import uglify		from 'gulp-uglify';
import rename       from 'gulp-rename';
import replace 		from 'gulp-replace';
import concat       from 'gulp-concat';
import fs 			from 'fs';
import rCollector 	from 'gulp-requirejs-rev-replace';

let _config = {
	sassRoot : path.join(__dirname, 'public/css/'),
	ejsRoot  : path.join(__dirname, 'views/'),
	toolsRoot: path.join(__dirname, 'public/js/tools/'),
	libRoot  : path.join(__dirname, 'public/js/lib/'),
	appsRoot : path.join(__dirname, 'public/js/apps/'),
	jsRoot   : path.join(__dirname, 'public/js/')
};

gulp.task('sass', () => {
	return sass(`${_config.sassRoot}**/*.scss`, { sourcemap: true })
		.on('error', sass.logError)
		.pipe(sourcemaps.write('maps', {
			includeContent: false,
			sourceRoot: `${_config.sassRoot}maps`
		}))
		.pipe(gulp.dest(_config.sassRoot));
});

gulp.task('rev', () => {
	return gulp.src([`${_config.appsRoot}**/*.js`, `${_config.jsRoot}*.js`, `${_config.toolsRoot}*.js`], {base: 'public'})
		.pipe(rev())
		.pipe(uglify())
		.pipe(rename((path) => {
			if(path.basename.indexOf('.min') == -1){
				path.basename += '.min';
			}
		}))
		.pipe(gulp.dest('public'))
		.pipe(rev.manifest({
			// base  : path.join(process.pwd(), '/public/js/'),
			// cwd   : path.join(process.pwd(), '/public/js/'),
			merge : true
		}))
		// .pipe(replace('{', 'modules = {'))
		// .pipe(replace('}', '};'))
		.pipe(gulp.dest('public/js'));
});

gulp.task('collector', ['rev'], () => {
	return gulp.src(['public/js/*.json', 'views/**/*.ejs'])
		.pipe(collector({
			replaceReved: true,
			revSuffix: '-[0-9a-f]{8,10}.min-?'
		}))
		.pipe(gulp.dest('views/'));
});

gulp.task('rCollector', ['collector'], () => {
	return gulp.src('public/js/base_config-*.js')
		.pipe(rCollector({
			manifest: gulp.src('public/js/rev-manifest.json')
		}))
		.pipe(uglify())
		.pipe(gulp.dest('public/js'));
});

gulp.task('inject', ['rCollector'], () => {
	let modules = JSON.parse(fs.readFileSync('public/js/rev-manifest.json', 'utf8'));
	let configName = modules['js/base_config.js'].split('/')[1];
	return gulp.src(['public/js/rev-manifest.json', path.join('public/js', configName)])
		.pipe(concat(configName), { newLine: ';' })
		.pipe(replace(/^{/, 'modules = {'))
		.pipe(replace(/^}/, '};'))
		.pipe(uglify())
		.pipe(gulp.dest('public/js/'));
});

gulp.task('watch', ['sass'], () => {
	return gulp.watch(`${_config.sassRoot}**/*.scss`, ['sass']);
});

gulp.task('build', ['inject']);

gulp.task('default', ['sass']);