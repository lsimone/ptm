"use strict"

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    connect = require('gulp-connect'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat');

gulp.task('default', function() {
    // place code for your default task here
});


gulp.task('sass', function() {
    gulp.src('app/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('app.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(__dirname + '/app/css'));
});


gulp.task('reload', function() {
    gulp.src('*')
        .pipe(connect.reload());
});

gulp.task('watch', function() {
    gulp.watch([
        'app/**/*.js', 
        'app/**/*.html', 
        'app/css/*.css',
        '!app/bower_components/**/*'
        ], ['reload']);

    gulp.watch(['**/*.scss'], ['sass']);
});


gulp.task('serve', ['sass', 'watch'], function() {
    connect.server({
        root: 'app',
        livereload: true
    });
});