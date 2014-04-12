'use strict';

var Q = require('q'),
    _ = require('lodash-node'),
    http = require('q-io/http');

function singleUrl(url) {
  var deferred = Q.defer();
  http.request(url)
    .then(function (response) {
      return response.body.read();
    })
    .then(function (body) {
      deferred.resolve(body.toString('utf-8'));
    });

  return deferred.promise;
}

exports.singleUrl = singleUrl;

exports.multipleUrls = function (urls) {
  var promises = _.map(urls, function (url) {
    return singleUrl(url);
  });

  return Q.all(promises);
};