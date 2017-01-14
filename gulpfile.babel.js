'use strict';
import gulp       from 'gulp';
import sass       from 'gulp-ruby-sass';
import sourcemaps from 'gulp-sourcemaps';
import path       from 'path';

let _config = {
	sassRoot : path.join(__dirname, 'public/css/')
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

gulp.task('default', ['sass']);