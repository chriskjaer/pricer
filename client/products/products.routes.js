'use strict';

var template = require('./products.template.jade');
    
module.exports = function ($routeProvider) {
  $routeProvider
    .when('/', {
      template: template
    })
    .otherwise({
      redirectTo: '/'
    });
};