'use strict';


function productsCtrl(productsService, $stateParams) {
  var products = this;

  productsService.getProducts().then(function (response) {
    products.data = response.data;
  });
}

productsCtrl.$inject = ['productsService'];

module.exports = productsCtrl;
