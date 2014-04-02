'use strict';

module.exports = function () {
  return {
    getProducts: function ($http) {
      var API_ENDPOINT = '/api/products';
      return $http.get(API_ENDPOINT);
    }
  };
};