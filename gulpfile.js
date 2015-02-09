var r             = require('project-base');
var _             = require('lodash');
var gulp          = require('gulp');
var webpack       = require('gulp-webpack');
var webpackConfig = require(r+'webpack-cfg.js');

gulp.task('default', function () {
  return gulp.src(r+'app/js/app.js')
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest(r+'public/js/'))
});

gulp.task('watch', function () {
  return gulp.src(r+'app/js/app.js')
    .pipe(webpack(_.extend({ watch: true }, webpackConfig)))
    .pipe(gulp.dest(r+'public/js/'))
});


