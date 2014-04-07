'use strict';

var Q = require('q'),
    cheerio = require('cheerio'),
    _ = require('lodash-node'),
    request = Q.denodeify(require('request'));

function getTopCategoryUrls(html) {
  var deferred = Q.defer(),
      categoryUrls = [],
      $ = cheerio.load(html);

  $('.categories li a').each(function () {
    categoryUrls.push(this.attr('href'));
  });

  console.log('Done. Got %d Category Links', categoryUrls.length);
  deferred.resolve(categoryUrls);

  return deferred.promise;
}

function getSubCategoryUrls(urls) {
  var promises = [],
      subCategoryUrls = [],
      deferred = Q.defer();

  _.each(urls, function (url) {
    promises.push(request(url));
  });

  Q.all(promises).then(function (result) {
    _.each(result, function (html) {
      var $ = cheerio.load(html);
      $('.categories .suboption').each(function () {
        var category = $(this);
        subCategoryUrls.push(category.attr('href'));
      });
    });

    console.log('Done. Got %d Sub Category Links', subCategoryUrls.length);
    deferred.resolve(subCategoryUrls);
  });

  return deferred.promise;
}

function getProductsFromUrls(urls) {
  var promises = [],
      products = [],
      deferred = Q.defer();

  console.log('Starting to scrape the products...');

  _.each(urls, function (url) {
    promises.push(request(url));
  });

  Q.all(promises).then(function (result) {
    console.log('We got the html! Time to scrape the products...');

    _.each(result, function (html) {
      var $ = cheerio.load(html);

      $('#products .product').each(function () {
        var $this = $(this),
            a = $this.find('a[title]').eq(0);


        var product = {
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

request('http://www.mosscopenhagen.com/shop.html')
  .then(getTopCategoryUrls)
  // .then(getSubCategoryUrls)
  .then(getProductsFromUrls)
  .then(function (result) {
    console.log(result);
    console.log('\nFinished scraping: \nAdded %d products to the database\n', result.length);
  }
);