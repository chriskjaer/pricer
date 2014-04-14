'use strict';


function filterCtrl(filterService) {
  var filter = this;

  filterService.getFilter()
    .then(function (response) {
      filter.categories = response.data;
    });
}

module.exports = filterCtrl;

filterCtrl.$inject = ['filterService'];

