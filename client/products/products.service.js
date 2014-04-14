'use strict';

module.exports = function () {
  return {
    getProducts: function ($http) {
      return $http.get('/api/products');
    },
    getFilter: function ($http) {
      return $http.get('/api/filter');
    }
  };
};