'use strict';

var uiRouter = require('ui-router/release/angular-ui-router'),
    filterService = require('./filter.service'),
    filterCtrl = require('./filter.controller'),
    routes = require('./filter.routes'),
    products = require('./products');

module.exports = angular
  .module('pApp.filter', [
    uiRouter,
    products.name
  ])
  .run(function ($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
  })
  .config(routes)
  .factory('filterService', filterService)
  .controller('filterCtrl', filterCtrl);