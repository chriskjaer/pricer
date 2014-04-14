'use strict';

var express = require('express'),
    stylus = require('stylus'),
    autoprefixer = require('autoprefixer-stylus');

module.exports = function (app, config) {
  function compile(src, path) {
    return stylus(src)
            .use(autoprefixer())
            .set('filename', path)
            .set('include css', true)
            .set('paths', [config.rootPath + 'node_modules/',
              config.rootPath + 'public/stylesheets']);
  }

  app.configure(function () {
    app.set('views', config.rootPath + '/server/views');
    app.set('view engine', 'jade');
    app.use(express.logger('dev'));
    app.use(express.cookieParser());
    app.use(express.bodyParser());
    app.use(express.session({secret: 'mean unicorns ftw'}));
    app.use(stylus.middleware(
      {
        src: config.rootPath + '/public',
        compile: compile
      }
    ));
    app.use(express.static(config.rootPath + '/public'));
  });
};
