'use strict';

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rimraf = require('gulp-rimraf');
var jshint = require('gulp-jshint');
var rename = require('gulp-rename');
var git = require('gulp-git');
var stylish = require('jshint-stylish');

var srcFile = 'src/reactjs-ui.js';
var srcCss = 'src/reactjs-ui.css';
var distDir = './dist';

gulp.task('default', ['copy']);

gulp.task('dev', ['default'], function () {
  return gulp.watch([srcFile, srcCss], ['default']);
});

gulp.task('jshint', function () {
  return gulp.src(srcFile)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('copy', function () {
  return gulp.src([srcFile, srcCss])
    .pipe(gulp.dest(distDir));
});

gulp.task('uglify', function () {
  return gulp.src(srcFile)
    .pipe(uglify({
      preserveComments: 'none'
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(distDir));
});

gulp.task('clean', function () {
  return gulp.src(distDir)
    .pipe(rimraf());
});

// Run git add with options 
gulp.task('add', function(){
  return gulp.src('.')
    .pipe(git.add({args: '-f -i -p'}));
});
