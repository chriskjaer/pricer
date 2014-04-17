'use strict';

var mongoose = require('mongoose'),
    timestamps = require('mongoose-timestamp'),
    _ = require('lodash-node'),
    mossCphScraper = require('../scraper/mossCphScraper');


var productSchema = mongoose.Schema({
  brand: String,
  price: Number,
  img: String,
  link: String,
  name: String,
  category: String,
  subCategory: String
});

productSchema.plugin(timestamps);

var Product = mongoose.model('Product', productSchema);

function createInitialProducts() {
  var promise = Product.find({}).exec();

  promise.then(function (result) {
      if (result.length === 0) {
        console.log('Database empty. Starting scraper');
        return mossCphScraper();
      }
    })
    .then(function (products) {
      _.each(products, function (product) {
        Product.create(product);
      });
      console.log('Done! Added %d products to the database', products.length);
    });
}

exports.createInitialProducts = createInitialProducts;
