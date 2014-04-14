'use strict';

var index = require('./filter.index.jade');

module.exports = function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('');

  $stateProvider
    .state('index', {
      url: '',
      template: index,
      controller: 'filterCtrl as filter'
    });
};