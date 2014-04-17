'use strict';

var index = require('./products.index.jade');

module.exports = function ($stateProvider) {
  $stateProvider
    .state('index.products', {
      url: '/produkter',
      template: index,
      controller: 'productsCtrl as products'
    })
      .state('index.products.category', {
        url: '/{category}'
      })
        .state('index.products.category.subCategory', {
          url: '/{subCategory}'
        });
};