'use strict';
import gulp         from 'gulp';
import sass         from 'gulp-ruby-sass';
import sourcemaps   from 'gulp-sourcemaps';
import path         from 'path';
import md5          from 'gulp-md5-plus';
import rev          from 'gulp-rev';
import revCollector from 'gulp-rev-collector';

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
	return gulp.src(['public/css/**/*.css', 'public/js/**/*.js'], { base: 'public' })
		.pipe(rev())
		.pipe(gulp.dest('public/'))
		.pipe(rev.manifest())
		.pipe(gulp.dest('public/js/'));
});

gulp.task('collector', ['rev'], () => {
	return gulp.src(['public/js/*.json', 'views/**/*.ejs'])
		.pipe(revCollector({ replaceReved: true }))
		.pipe(gulp.dest('views/'));
});

gulp.task('revCollector', () => {

});

gulp.task('watch', ['sass'], () => {
	return gulp.watch(`${_config.sassRoot}**/*.scss`, ['sass']);
});

gulp.task('default', ['sass']);