'use strict';

var productsCtrl = require('./products.controller');
var productsService = require('./products.service');
var routes = require('./products.routes');

module.exports = angular
  .module('ckApp.products', ['ngRoute'])
  .config(routes)
  .factory('productsService', productsService)
  .controller('ProductsController', productsCtrl);