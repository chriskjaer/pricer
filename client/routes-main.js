'use strict';

var template = require('./view-main.jade');
    
module.exports = function ($routeProvider) {
  $routeProvider
    .when('/', {
      template: template
    })
    .otherwise({
      redirectTo: '/'
    });
};