require('angular');
require('angular-route');
var products = require('./products');

angular.module('pApp', ['ngRoute', products.name]);
