'use strict';

var Product = require('mongoose').model('Product');

exports.getProducts = function (req, res) {
  Product.find({}).exec(function (err, collection) {
    res.send(collection);
  });
};
