'use strict';

var mongoose = require('mongoose'),
    request = require('request'),
    cheerio = require('cheerio');


var productSchema = mongoose.Schema({
  brand: String,
  price: Number,
  img: String,
  link: String,
  title: String
});

var Product = mongoose.model('Product', productSchema);

function createInitialProducts() {
  Product.find({}).exec(function (err, collection) {
    if (collection.length === 0) {
      var URL = 'http://www.ellos.dk';

      request(URL + '/adidas?rcnt=10', function (error, response, html) {
        if (!error && response.statusCode === 200) {
          var $ = cheerio.load(html);

          $('.productContent').each(function () {
            var product = $(this);

            var brand = product.find('.brand').text();
            var price = product.find('.price').text().replace(',-', '');
            var img = product.find('.imageContainer').attr('data-original').replace('//', 'http://');
            var a = product.find('a[title]').eq(0);
            var title = a.attr('title');
            var link = a.attr('href');

            Product.create({
              brand: brand,
              price: parseInt(price, 10),
              img: img,
              title: title,
              link: URL + link
            });

          });
        }
      });
    }
  });
}

exports.createInitialProducts = createInitialProducts;
