'use strict';

var productsService = require('./products.service');
var routes = require('./products.routes');

module.exports = angular
  .module('pApp.products', [])
  .config(routes)
  .factory('productsService', productsService);