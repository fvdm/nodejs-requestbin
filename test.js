/*
Name:           requestbin - test.js
Author:         Franklin van de Meent (https://frankl.in)
Source & docs:  https://github.com/fvdm/nodejs-requestbin
Feedback:       https://github.com/fvdm/nodejs-requestbin/issues
License:        Unlicense / Public Domain (see UNLICENSE file)
                (https://github.com/fvdm/nodejs-requestbin/raw/develop/UNLICENSE)
*/

var http = require ('httpreq');
var dotest = require ('dotest');
var app = require ('./');


// Setup
var timeout = process.env.REQUESTBIN_TIMEOUT || 5000;
var iface = process.env.REQUESTBIN_INTERFACE || null;
var baseURL = process.env.REQUESTBIN_BASE_URL || null;
var userAgent = process.env.REQUESTBIN_USER_AGENT || null;

var cache = {
  bin: null,
  request: null,
  post: {
    nodejs: process.versions.node
  }
};

app.config ({
  timeout: timeout,
  iface: iface,
  baseURL: baseURL,
  userAgent: userAgent
});


dotest.add ('Error: request failed', function () {
  app.config ({ timeout: 1 });
  app.create ('invalid', function (err) {
    dotest.test ()
      .isError ('fail', 'err', err)
      .isExactly ('fail', 'err.message', err && err.message, 'request failed')
      .isError ('fail', 'err.error', err && err.error)
      .done ();
  });
});


dotest.add ('.create', function () {
  app.config ({ timeout: timeout });
  app.create (false, function (err, data) {
    cache.bin = data || null;

    if (data) {
      http.post ('http://requestb.in/' + data.name, { parameters: cache.post }, function () {});
      dotest.log ('info', 'http://requestb.in/' + data.name + '?inspect');
    }

    dotest.test (err)
      .isObject ('fail', 'data', data)
      .isString ('warn', 'data.name', data && data.name)
      .done ();
  });
});


dotest.add ('.get', function () {
  if (!cache.bin) {
    console.log ('skip - .get');
    return;
  }

  app.get (cache.bin.name, function (err, data) {
    dotest.test (err)
      .isObject ('fail', 'data', data)
      .isExactly ('warn', 'data.name', data && data.name, cache.bin.name)
      .done ();
  });
});


dotest.add ('.requests', function () {
  if (!cache.bin) {
    console.log ('skip - .requests');
    return;
  }

  app.requests (cache.bin.name, function (err, data) {
    cache.request = data && data [0] || null;
    dotest.test (err)
      .isArray ('fail', 'data', data)
      .isNotEmpty ('warn', 'data', data)
      .isObject ('warn', 'data[0]', data && data [0])
      .done ();
  });
});


dotest.add ('.request', function () {
  if (!cache.request) {
    console.log ('skip - .request');
    return;
  }

  app.request (cache.bin.name, cache.request.id, function (err, data) {
    dotest.test (err)
      .isObject ('fail', 'data', data)
      .isExactly ('warn', 'data.id', data && data.id, cache.request.id)
      .done ();
  });
});


dotest.run (1000);
