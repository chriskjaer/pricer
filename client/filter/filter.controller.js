'use strict';


function filterCtrl(filterService, $stateParams) {
  var filter = this;

  console.log($stateParams);

  filterService.getFilter()
    .then(function (response) {
      filter.categories = response.data;
    });
}

module.exports = filterCtrl;

filterCtrl.$inject = ['filterService'];

