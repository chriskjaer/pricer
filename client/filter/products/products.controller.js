'use strict';

var _ = require('lodash-node');


function productsCtrl(productsService) {
  var products = this,
      mostExpensive = 0,
      cheapest = 0;

  productsService.getProducts()
    .then(function (response) {
      products.data = response.data;

      mostExpensive = _.max(response.data, 'price');
      cheapest = _.min(response.data, 'price');

      products.slider = {
        min: cheapest.price,
        max: mostExpensive.price,
      };

      products.maxPrice = mostExpensive.price;
    });

  products.filterByMaxPrice = function (product) {
    var maxPrice = parseInt(products.maxPrice, 10);

    if (_.isUndefined(products.maxPrice)) {
      return true;
    } else if (product.price <= maxPrice) {
      return true;
    }
  };
}

productsCtrl.$inject = ['productsService'];

module.exports = productsCtrl;
