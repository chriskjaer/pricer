'use strict';

var productsService = require('./products.service');
var routes = require('./products.routes');

module.exports = angular
  .module('pApp.products', ['ngRoute', require('ui-router/release/angular-ui-router')])
  .config(routes)
  .factory('productsService', productsService);