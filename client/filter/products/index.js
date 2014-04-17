'use strict';

require('angular-touch');
require('angularjs-slider');

var productsService = require('./products.service'),
    routes = require('./products.routes'),
    uiRouter = require('angular-ui-router'),
    productsCtrl = require('./products.controller');

module.exports = angular
  .module('pApp.filter.products', [
    uiRouter,
    'ngTouch',
    'rzModule'
  ])
  .config(routes)
  .factory('productsService', productsService)
  .controller('productsCtrl', productsCtrl);