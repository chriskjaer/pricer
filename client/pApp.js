require('angular');
var products = require('./products');

angular.module('pApp', [require('ui-router/release/angular-ui-router'), products.name]);
