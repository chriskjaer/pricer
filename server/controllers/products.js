'use strict';

var Product = require('mongoose').model('Product');

exports.getProducts = function (req, res) {
  Product.find({}).exec()
    .then(function (collection) {
      res.send(collection);
    });
};

exports.getFilter = function (req, res) {
  var filter = Product.aggregate({
      '$group': {
        '_id': '$category',
        subCategories: { $addToSet: '$subCategory'}
      }
    }).exec();

  filter.then(function (result) {
    res.send(result);
  });
};