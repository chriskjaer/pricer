#!/usr/bin/env node
'use strict';

require('q-io/http')
  .request('http://chriskjaer.dk')
  .then(function (response) {
    return response.body.read();
  })
  .then(function (body) {
    console.log(body.toString('utf-8'));
  });
