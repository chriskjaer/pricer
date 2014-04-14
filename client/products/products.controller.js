'use strict';


function productsCtrl($http, productsService, $scope) {

  productsService.getProducts($http).then(function (response) {
    $scope.products = response.data;
  });

  productsService.getFilter($http).then(function (response) {
    $scope.filters = response.data;
  });

  $scope.filterSettings = {
    category: '',
    subCategory: ''
  };

  $scope.updateCategory = function (val) {
    $scope.filterSettings = {
      category: val,
      subCategory: ''
    };
  };

  $scope.updateSubCategory = function (val) {
    $scope.filterSettings.subCategory = val;
  };
}

module.exports = productsCtrl;

productsCtrl.$inject = ['$http', 'productsService', '$scope'];

