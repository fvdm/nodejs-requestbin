requestbin
==========

[RequestBin](http://requestb.in/) API methods for Node.js

[![Build Status](https://travis-ci.org/fvdm/nodejs-requestbin.svg?branch=master)](https://travis-ci.org/fvdm/nodejs-requestbin)


Usage
-----

```js
var requestbin = require ('requestbin');

requestbin.create (false, function (err, data) {
  if (err) { return console.log (err); }

  console.log ('Send requests to: http://requestb.in/' + data.name);
  console.log ('Inspect requests: http://requestb.in/' + data.name + '?inspect');
});
```


Installation
------------

`npm install requestbin`


Callback & errors
-----------------

The callback receives only one parameter `err` in case of an error.
This will be an`instanceof Error` with stack trace and sometimes more properties to describe the error.

When everything seems fine the `err` param is `null` and a second param `data` contains the result.

```js
function callback (err, data) {
  if (!err) {
    console.log (data);
  } else {
    console.log (err);          // message + info properties, ie. details
    console.log (err.stack);    // what caused it
  }
}
```

#### Errors

message          | description
:----------------|:----------------------------
request failed   | Request can't be made
invalid response | API did not return JSON data
HTTP error       | HTTP error like `404`


.config ( object )
------------------

Set configuration options.

name    | type    | default | description
:-------|:--------|:--------|:-------------------------
timeout | integer | 5000    | Request time out in ms
iface   | string  |         | Outbound interface to use

```js
requestbin.config ({
  iface: '1.2.3.4'
});
```


.create ( [isPrivate], callback )
---------------------------------

Create a new bin.

param     | type     | required | default | description
:---------|:---------|:---------|:--------|:-----------------
isPrivate | boolean  | no       | `true`  | Set to `true` to make this request bin private.
callback  | function | yes      |         | Callback function

```js
// make it public
requestbin.create (false, console.log);
```

```js
{ color: [ 70, 150, 120 ],
  name: 'oiwxgloi',
  private: false,
  request_count: 0 }
```

The test URL is `http://requestb.in/NAME`
The inspect URL is `http://requestb.in/NAME?inspect`


.get ( binName, callback )
------------------------

Get details about a bin.

param    | type     | required | default | description
:--------|:---------|:---------|:--------|:-----------------------
binName  | string   | yes      |         | Bin name/ID to retrieve
callback | function | yes      |         | Callback function

```js
requestbin.get ('oiwxgloi', console.log);
```

```js
{ color: [ 70, 150, 120 ],
  name: 'oiwxgloi',
  private: false,
  request_count: 1 }
```


.requests ( binName, callback )
-----------------------------

Get a list of the requests made to a bin.

param    | type     | required | default | description
:--------|:---------|:---------|:--------|:-----------------------
binName  | string   | yes      |         | Bin name/ID to retrieve
callback | function | yes      |         | Callback function

```js
requestbin.requests ('oiwxgloi', console.log);
```

```js
[ { content_length: null,
    body: '',
    form_data: [],
    remote_addr: '1.2.3.4',
    method: 'GET',
    headers: 
     { Host: 'requestb.in',
       Connection: 'keep-alive',
       Accept: '*/*',
       'User-Agent': 'curl/7.27.0' },
    content_type: null,
    time: 1358144300.182959,
    query_string: '',
    path: '/oiwxgloi',
    id: 'sz42lo' } ]
```


.request ( binName, requestId, callback )
---------------------------------------

Get details about one request made to a bin.

param     | type     | required | default | description
:---------|:---------|:---------|:--------|:-----------------------
binName   | string   | yes      |         | Bin name/ID to retrieve
requestId | string   | yes      |         | Request ID to retrieve
callback  | function | yes      |         | Callback function

```js
requestbin.request ('oiwxgloi', 'sz42lo', console.log);
```

_The output is much like the previous example, but it's an object instead of array._


Unlicense
---------

This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

In jurisdictions that recognize copyright laws, the author or authors
of this software dedicate any and all copyright interest in the
software to the public domain. We make this dedication for the benefit
of the public at large and to the detriment of our heirs and
successors. We intend this dedication to be an overt act of
relinquishment in perpetuity of all present and future rights to this
software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

For more information, please refer to <http://unlicense.org>


Author
------

Franklin van de Meent
| [Website](https://frankl.in)
| [Github](https://github.com/fvdm)
