'use strict';
import gulp       from 'gulp';
import sass       from 'gulp-ruby-sass';
import sourcemaps from 'gulp-sourcemaps';
import path       from 'path';
import md5        from 'gulp-md5-plus';
import rev		  from 'gulp-rev';

let _config = {
	sassRoot : path.join(__dirname, 'public/css/'),
	ejsRoot  : path.join(__dirname, 'views/')
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

gulp.task('md5', () => {
	return gulp.src(`${_config.sassRoot}*.css`)
		.pipe(md5(10, `${_config.ejsRoot}**/*.ejs`))
		.pipe(gulp.dest(_config.sassRoot));
});

gulp.task('rev', () => {
	return gulp.src('public/css/**/*.css')
		.pipe(rev())
		.pipe(gulp.dest('public/css'))
		.pipe(rev.manifest())
		.pipe(gulp.dest('public/css'));
});

gulp.task('watch', ['sass'], () => {
	return gulp.watch(`${_config.sassRoot}**/*.scss`, ['sass']);
});

gulp.task('default', ['sass']);