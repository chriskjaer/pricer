require('angular');
require('angular-route');
var products = require('./products');

angular.module('ckApp', ['ngRoute', products.name]);
