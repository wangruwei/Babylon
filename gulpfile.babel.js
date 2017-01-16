'use strict';
import gulp         from 'gulp';
import sass         from 'gulp-ruby-sass';
import sourcemaps   from 'gulp-sourcemaps';
import path         from 'path';
import md5          from 'gulp-md5-plus';
import rev          from 'gulp-rev';
import revCollector from 'gulp-rev-collector';
// import minifyCss    from 'minify-css';
import uglify		from 'gulp-uglify';
import rename	    from 'gulp-rename';

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
			merge: true
		}))
		.pipe(gulp.dest('public/js'));
});

gulp.task('replace', ['rev'], () => {
	return gulp.src(['public/js/*.json', 'views/**/*.ejs'])
		.pipe(revCollector({
			replaceReved: true,
			revSuffix: '-[0-9a-f]{8,10}.min-?'
		}))
		.pipe(gulp.dest('views/'));
});

gulp.task('watch', ['sass'], () => {
	return gulp.watch(`${_config.sassRoot}**/*.scss`, ['sass']);
});

gulp.task('default', ['sass']);