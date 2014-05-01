'use strict';


function filterCtrl(filterService) {
  var filter = this;

  filterService.getFilter()
    .then(function (response) {
      filter.categories = response.data;
    });

  filter.setSubCategory = function (array) {
    filter.subCategories = array;
  };
}

module.exports = filterCtrl;

filterCtrl.$inject = ['filterService'];

