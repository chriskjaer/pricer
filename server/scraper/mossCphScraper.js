'use strict';

var Q = require('q'),
    _ = require('lodash-node'),
    request = require('./request'),
    cheerio = require('cheerio');

function getTopCategoryUrls(html) {
  var deferred = Q.defer(),
      categoryUrls = [],
      $ = cheerio.load(html);

  $('.categories li a').each(function () {
    categoryUrls.push(this.attr('href'));
  });

  deferred.resolve(categoryUrls);

  return deferred.promise;
}

function getSubCategoryUrls(urls) {
  var subCategoryUrls = [],
      deferred = Q.defer();

  request.multipleUrls(urls).then(function (result) {
    _.each(result, function (html) {
      var $ = cheerio.load(html);
      $('.categories .suboption').each(function () {
        var category = $(this);
        subCategoryUrls.push(category.attr('href'));
      });
    });

    deferred.resolve(subCategoryUrls);
  });

  return deferred.promise;
}

function getProductsFromUrls(urls) {
  var products = [],
      deferred = Q.defer();

  request.multipleUrls(urls).then(function (result) {

    _.each(result, function (html) {
      var $ = cheerio.load(html);
      var BRAND = 'Moss Copenhagen';

      $('#products .product').each(function () {
        var $this = $(this);
        var a = $this.find('a[title]').eq(0);
        var product = {
          brand: BRAND,
          price: parseInt($this.find('.price').text().replace('DKK', ''), 10),
          img: $this.find('.image img').attr('src').trim(),
          name: a.attr('title').trim(),
          link: a.attr('href'),
          category: $('.categories').find('li.selected .option').text().trim(),
          subCategory: $('.categories').find('a.suboption.subselected').text().replace('- ', '').trim()
        };

        products.push(product);
      });
    });

    deferred.resolve(products);
  });

  return deferred.promise;
}

module.exports = function () {
  return request.singleUrl('http://www.mosscopenhagen.com/shop.html')
    .then(getTopCategoryUrls)
    .then(getSubCategoryUrls)
    .then(getProductsFromUrls);
};
