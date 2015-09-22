/*
Name:           requestbin - test.js
Author:         Franklin van de Meent (https://frankl.in)
Source & docs:  https://github.com/fvdm/nodejs-requestbin
Feedback:       https://github.com/fvdm/nodejs-requestbin/issues
License:        Unlicense / Public Domain (see UNLICENSE file)
                (https://github.com/fvdm/nodejs-requestbin/raw/develop/UNLICENSE)
*/

// Setup
var app = require ('./');
var pkg = require ('./package.json');
var http = require ('httpreq');
var timeout = process.env.REQUESTBIN_TIMEOUT || 5000;
var cache = {
  bin: null,
  request: null,
  post: {
    node: process.version,
    module: pkg.version
  }
};
var errors = 0;
var queue = [];
var next = 0;


// handle exits
process.on ('exit', function () {
  if (errors === 0) {
    console.log ('\n\u001b[1mDONE, no errors.\u001b[0m\n');
    process.exit (0);
  } else {
    console.log ('\n\u001b[1mFAIL, ' + errors + ' error' + (errors > 1 ? 's' : '') + ' occurred!\u001b[0m\n');
    process.exit (1);
  }
});

// prevent errors from killing the process
process.on ('uncaughtException', function (err) {
  console.log ();
  console.error (err.stack);
  console.trace ();
  console.log ();
  errors++;
});

// Queue to prevent flooding
function doNext () {
  next++;
  if (queue [next]) {
    queue [next] ();
  }
}

// doTest( passErr, 'methods', [
//   ['feeds', typeof feeds === 'object']
// ])
function doTest (err, label, tests) {
  var testErrors = [];
  var i;

  if (err instanceof Error) {
    console.error ('\u001b[1m\u001b[31mERROR\u001b[0m - ' + label + '\n');
    console.dir (err, { depth: null, colors: true });
    console.log ();
    console.error (err.stack);
    console.log ();
    errors++;
  } else {
    for (i = 0; i < tests.length; i++) {
      if (tests [i] [1] !== true) {
        testErrors.push (tests [i] [0]);
        errors++;
      }
    }

    if (testErrors.length === 0) {
      console.log ('\u001b[1m\u001b[32mgood\u001b[0m - ' + label);
    } else {
      console.error ('\u001b[1m\u001b[31mFAIL\u001b[0m - ' + label + ' (' + testErrors.join (', ') + ')');
    }
  }

  doNext ();
}


queue.push (function () {
  app.create (false, function (err, data) {
    cache.bin = data || null;
    if (data) {
      http.post ('http://requestb.in/' + data.name, {parameters: cache.post}, function (e,r) {});
      console.log ('info - http://requestb.in/' + data.name + '?inspect');
    }
    doTest (err, '.create', [
      ['type', data instanceof Object],
      ['name', data && typeof data.name === 'string']
    ]);
  });
});


queue.push (function () {
  if (!cache.bin) {
    console.log ('skip - .get');
    return;
  }
  app.get (cache.bin.name, function (err, data) {
    doTest (err, '.get', [
      ['type', data instanceof Object],
      ['name', data && data.name === cache.bin.name]
    ]);
  });
});


queue.push (function () {
  if (!cache.bin) {
    console.log ('skip - .requests');
    return;
  }
  app.requests (cache.bin.name, function (err, data) {
    cache.request = data && data [0] || null;
    doTest (err, '.requests', [
      ['type', data instanceof Array],
      ['item', data && data [0] instanceof Object]
    ]);
  });
});


queue.push (function () {
  if (!cache.request) {
    console.log ('skip - .request');
    return;
  }
  app.request (cache.bin.name, cache.request.id, function (err, data) {
    doTest (err, '.request', [
      ['type', data instanceof Object],
      ['id', data && data.id === cache.request.id]
    ]);
  });
});


console.log ('Running tests...');
queue [0] ();
