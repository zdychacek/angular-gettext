var gulp = require('gulp');
var gettext = require('gulp-angular-gettext');

gulp.task('translate:extract', function () {
	return gulp.src(['sample/**/*.{html,js}', '!sample/components'])
		.pipe(gettext.extract('template.pot', {}))
		.pipe(gulp.dest('po'));
});

gulp.task('translate:compile', function () {
	return gulp.src('po/**/*.po')
		.pipe(gettext.compile({
			format: 'javascript',
			module: 'app'
		}))
		.pipe(gulp.dest('sample/js'));
});