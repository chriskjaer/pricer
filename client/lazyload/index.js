'use strict';

require('bLazy');

module.exports = function () {
  
  window.bLazy = new Blazy({
    selector: '.lazy'
  });

};

