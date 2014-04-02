'use strict';

var mongoose = require('mongoose'),
    productModel = require('../modules/Product');

module.exports = function (config) {
  mongoose.connect(config.db);
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error...'));
  db.once('open', function callback() {
    console.log('pricer db opened');
  });

  productModel.scrapeMossCopenhagen();

};