'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserify = require('gulp-browserify'),
    concat = require('gulp-concat');

//
// TASKS
// -------------------------------------------------------------

// --- Task for compiling our sass ---
gulp.task('css', function () {
  return gulp.src('./app/assets/styles/*.scss')
    .pipe(
      sass({
      errLogToConsole: true,
      sourceComments: 'map'
    })
    )
    .pipe(gulp.dest('./app/assets/styles/'));
});


gulp.task('browserify', function () {
  return gulp.src(['./client/main.js'])
    .pipe(browserify({
      insertGlobals : true,
      debug : true,
      transform: ['jadeify'],
      extensions: ['.jade'],
      shim: {
        angular: {
          path: './node_modules/angular/angular.js',
          exports: 'angular'
        },
        'angular-route': {
          path: './node_modules/angular-route/angular-route.js',
          exports: 'ngRoute',
          depends: {
            angular: 'angular'
          }
        }
      }
    }))
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('./public/javascripts/'));
});


// --- Let gulp keep an eye on our files and compile stuff if it changes ---
gulp.task('watch', function () {
  gulp.watch('./app/assets/styles/**/*.scss', ['css']);
  gulp.watch('./client/**/*.*', ['browserify']);
});


// --- Default gulp task, run with gulp. - Starts our project and opens a new browser window.
gulp.task('default', ['css'], function () {
  gulp.start('watch');
});
