'use strict';

var uiRouter = require('angular-ui-router'),
    filterService = require('./filter.service'),
    filterCtrl = require('./filter.controller'),
    routes = require('./filter.routes'),
    products = require('./products'),
    _ = require('lodash-node');

module.exports = angular
  .module('pApp.filter', [
    uiRouter,
    products.name
  ])
  .run(function ($rootScope, $state, $stateParams) {
    _.assign($rootScope, {
      $state: $state,
      $stateParams: $stateParams
    });
  })
  .config(routes)
  .factory('filterService', filterService)
  .controller('filterCtrl', filterCtrl);