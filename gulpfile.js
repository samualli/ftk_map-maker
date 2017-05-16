'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();

var DEST = 'dist/';
var DEST_js = 'dists/scripts/';

gulp.task('styles', function(){
    return gulp.src('src/styles/ftk_map-maker.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest(DEST))
      .pipe(browserSync.stream());
});

gulp.task('scripts', function() {
    return gulp.src('src/scripts/*.js')
      .pipe(concat('ftk_map-maker.js'))
      .pipe(gulp.dest(DEST))
      //.pipe(uglify())
      //.on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
      //.pipe(rename({ extname: '.min.js' }))
     // .pipe(gulp.dest(DEST));
});

gulp.task('scripts:vendor', function(){
    return gulp.src('src/scripts/vendor/*.js')
      .pipe(gulp.dest(DEST));
});

gulp.task('scripts-watch', ['scripts'], function (done) {
    browserSync.reload();
    done();
});

gulp.task('html', function(){
    return gulp.src('src/*.html')
      .pipe(gulp.dest(DEST))
      .pipe(browserSync.stream());
});

gulp.task('build', ['scripts', 'scripts:vendor', 'styles', 'html'], function() {

});

gulp.task('default', ['scripts', 'scripts:vendor', 'styles', 'html'], function() {
    browserSync.init({
      server: "./dist"
    })

    gulp.watch("src/styles/*.scss", ['styles']);
    gulp.watch("src/scripts/*.js", ['scripts-watch']);
    gulp.watch("src/*.html", ['html']);
});

