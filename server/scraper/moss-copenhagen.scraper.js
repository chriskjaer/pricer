'use strict';

var mongoose = require('mongoose'),
    request = require('request'),
    cheerio = require('cheerio'),
    _ = require('lodash-node'),
    Q = require('q');


var productSchema = mongoose.Schema({
  brand: String,
  price: Number,
  img: String,
  link: String,
  name: String,
  category: String,
  subCategory: String
});

var Product = mongoose.model('Product', productSchema);

function getCategories(URL, SUB_URL) {
  var deferred = Q.defer();
  
  var categories = [];

  request(URL + SUB_URL, function (error, response, html) {
    if (!error && response.statusCode === 200) {
      var $ = cheerio.load(html);

      $('.categories li a').each(function () {
        var category = $(this);

        categories.push(category.attr('href'));

      });
    }
  });

  return categories;
}

function getSubcategories (categories) {
  var subCategories = [];

  _.each(categories, function (categoryUrl) {
    request(categoryUrl, function (error, response, html) {
      if (!error && response.statusCode === 200) {
        var $ = cheerio.load(html);

        $('.categories .suboption').each(function () {
          var category = $(this);

          subCategories.push(category.attr('href'));

        });
      }
    });
  });

  return subCategories;
}

function scrapeMossCopenhagen() {
  Product.find({}).exec(function (err, collection) {
    if (collection.length === 0) {
      var URL = 'http://www.mosscopenhagen.com/',
          SUB_URL = 'shop.html',
          BRAND = 'Moss Copenhagen';

      request(URL + SUB_URL, function (error, response, html) {
        if (!error && response.statusCode === 200) {
          var $ = cheerio.load(html);

          $('#products .product').each(function () {
            var product = $(this);

            var price = product.find('.price').text().replace('DKK', ''),
                img = product.find('.image img').attr('src'),
                a = product.find('a[title]').eq(0),
                name = a.attr('title'),
                link = a.attr('href'),
                category = $('.categories').find('li.selected .option').text(),
                subCategory = $('.categories').find('a.suboption.subselected').text().replace('- ', '');

            Product.create({
              brand: BRAND,
              price: parseInt(price, 10),
              img: img,
              name: name.trim(),
              link: link,
              category: category.trim(),
              subCategory: subCategory.trim()
            });

          });

          console.log('\nFinished scraping: %s\nAdded %d products to the database\n', URL + SUB_URL, $('#products .product').length);
        }
      });
    }
  });
}

exports.scrapeMossCopenhagen = scrapeMossCopenhagen;
