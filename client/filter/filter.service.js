'use strict';

function filter($http) {
  return {
    getFilter: function () {
      return $http.get('/api/filter');
    }
  };
}

filter.$inject = ['$http'];

module.exports = filter;