'use strict';
import gulp       from 'gulp';
import sass       from 'gulp-ruby-sass';
import sourcemaps from 'gulp-sourcemaps';
import path       from 'path';

gulp.task('sass', () => {
	sass('public/css/**/*.scss', { sourcemap: true })
		.on('error', sass.logError)
		.pipe(sourcemaps.write('maps', {
			includeContent: false,
			sourceRoot: 'public/css/maps'
		}))
		.pipe(gulp.dest('public/css'));
});

gulp.task('default', ['sass']);