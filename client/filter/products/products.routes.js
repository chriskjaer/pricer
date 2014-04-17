'use strict';

var index = require('./products.index.jade');

module.exports = function ($stateProvider) {
  $stateProvider
    .state('index.products', {
      url: '/produkter/{category}',
      template: index,
      controller: 'productsCtrl as products'
    })
    .state('index.products.subCategories', {
      url: '/{subCategory}'
    });
};