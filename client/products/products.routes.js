'use strict';

var index = require('./products.index.jade');
var list = require('./products.list.jade');
var productsCtrl = require('./products.controller');

module.exports = function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('index', {
      url: '/',
      template: index,
      controller: productsCtrl
    })
    .state('index.products', {
      url: 'produkter/',
      template: list
    });
};