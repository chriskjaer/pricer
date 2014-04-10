'use strict';

var Q = require('q'),
    request = Q.denodeify(require('hyperquest'));

function processResponse(response) {
  var deferred = Q.defer;

  response.on('data', function (html) {
    deferred.resolve(html);
  });

  return deferred.promise;
}

request('http://chriskjaer.dk').then(processResponse).done(console.log);