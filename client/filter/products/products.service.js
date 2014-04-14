'use strict';

function filterService($http) {
  return {
    getProducts: function () {
      return $http.get('/api/products');
    }
  };
}

filterService.$inject = ['$http'];

module.exports = filterService;