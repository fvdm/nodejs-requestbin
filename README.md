nodejs-requestbin
=================

API wrapper for [RequestBin](http://requestb.in/)


Installation
------------

With NPM for the latest *stable* release:

    npm install requestbin

Or from Github for the *most recent* code, but may be unstable:

    git clone https://github.com/fvdm/nodejs-requestbin
    npm install ./nodejs-requestbin


Usage
-----

This module has only four methods and each of them requires a callback function as last parameter to receive the results. The API response is JSON parsed to an object or array.

```js
var requestbin = require('requestbin')
requestbin.create( callbackFunction )
```


Callback & errors
-----------------

The callback receives only one parameter `err` in case of an error. This will be an `instanceof Error` with stack trace and sometimes more properties to describe the error.

When everything seems fine the `err` param is `null` and a second param `data` contains the result.

```js
function callback( err, data ) {
    if( !err ) {
        console.log( data )
    } else {
        console.log( err )          // message + info properties, ie. details
        console.log( err.stack )    // what caused it
    }
}
```

#### Errors

    Error: disconnected         : connection closed too early
    Error: request failed       : request can't be made
    Error: invalid response     : API did not return JSON
    Error: HTTP error           : a HTTP error like 404
    

.create ( callback )
--------------------

Create a new bin.

```js
requestbin.create( console.log )
```

```js
{ color: [ 70, 150, 120 ],
  name: 'oiwxgloi',
  private: false,
  request_count: 0 }
```

The test URL is `http://requestb.in/NAME`
The inspect URL is `http://requestb.in/NAME?inspect`


.get ( binID, callback )
--------------------------

Get a bin by its name/id.

```js
requestbin.get( 'oiwxgloi', console.log )
```

```js
{ color: [ 70, 150, 120 ],
  name: 'oiwxgloi',
  private: false,
  request_count: 1 }
```


.requests ( binID, callback )
-----------------------------

```js
requestbin.requests( 'oiwxgloi', console.log )
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


.request ( binID, requestID, callback )
---------------------------------------

```js
requestbin.request( 'oiwxgloi', 'sz42lo', console.log )
```

The output is much like the previous example, but it's an object instead of array.


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

