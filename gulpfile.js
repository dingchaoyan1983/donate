const gulp = require('gulp');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');

gulp.task('build', ['clean'], () =>
    gulp.src('src/server/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('dist'))
);

gulp.task('clean', () => {
  del([
    'dist/routes/**/*.js',
    'dist/service/**/*.js',
    'dist/app.js',
    'dist/config.js',
    'dist/index.js'
  ]);
})

gulp.task('default', ['build']);
