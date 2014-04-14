'use strict';

var productsService = require('./products.service'),
    routes = require('./products.routes'),
    uiRouter = require('ui-router/release/angular-ui-router'),
    productsCtrl = require('./products.controller');

module.exports = angular
  .module('pApp.filter.products', [uiRouter])
  .config(routes)
  .factory('productsService', productsService)
  .controller('productsCtrl', productsCtrl);