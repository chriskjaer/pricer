'use strict';

var gulp = require('gulp'),
    source = require('vinyl-source-stream'),
    watchify = require('watchify'),
    browserSync = require('browser-sync');

//
// TASKS
// -------------------------------------------------------------
gulp.task('watch', function () {
  var bundler = watchify('./client/pApp.js');

  function rebundle() {
    return bundler.bundle()
      .pipe(source('bundle.js'))
      .pipe(gulp.dest('./static/js/'))
      .pipe(browserSync.reload({stream: true, once: true}));
  }
  
  bundler.on('update', rebundle);

  return rebundle();
});

gulp.task('css', function () {
  gulp.src('./static/stylesheets/main.css')
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('bs-reload', function () {
  browserSync.reload();
});

gulp.task('browser-sync', function () {
  browserSync.init(null, {
    proxy: '0.0.0.0:1337'
  });
});


gulp.task('default', ['browser-sync'], function () {
  gulp.start('watch');
  gulp.watch('./static/stylesheets/*.css', ['bs-reload']);
});
