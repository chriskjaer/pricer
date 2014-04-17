'use strict';

var gulp = require('gulp'),
    source = require('vinyl-source-stream'),
    watchify = require('watchify');

//
// TASKS
// -------------------------------------------------------------
gulp.task('watch', function () {
  var bundler = watchify('./client/pApp.js');

  function rebundle() {
    return bundler.bundle()
      .pipe(source('bundle.js'))
      .pipe(gulp.dest('./static/javascripts/'));
  }
  
  bundler.on('update', rebundle);

  return rebundle();
});


gulp.task('default', function () {
  gulp.start('watch');
});
