'use strict';


function productsCtrl($http, productsService) {
  var app = this;

  productsService.getProducts($http).then(function (response) {
    app.products = response.data;
  });

}

module.exports =  productsCtrl;

productsCtrl.$inject = ['$http', 'productsService'];
