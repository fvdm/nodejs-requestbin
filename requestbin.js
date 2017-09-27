/*
Name:           requestbin
Description:    Node.js package to access the Requestb.in API
Author:         Franklin van de Meent (https://frankl.in)
License:        Unlicence (public domain, see LICENSE file)
Source & docs:  https://github.com/fvdm/nodejs-requestbin
Feedback:       https://github.com/fvdm/nodejs-requestbin/issues
*/


var httpreq = require ('httpreq');
var config = {
  timeout: 5000,
  iface: null,
  baseURL: null,
  userAgent: null
};


/**
 * Build an error
 *
 * @callback  callback
 * @param     {string}    msg       Error message
 * @param     {mixed}     err       Error details
 * @param     {object}    res       httpreq response
 * @param     {object}    options   request options
 * @param     {function}  callback  `(err)`
 * @return    {void}
 */

function doError (msg, err, res, options, callback) {
  var error = new Error (msg);

  error.httpCode = res && res.statusCode || null;
  error.error = err || null;
  error.request = options;
  error.response = {
    headers: res && res.headers,
    body: res && res.body
  };

  callback (error);
}


/**
 * Process response
 *
 * argument order is to prevent callback
 * handler detection in code parsers
 *
 * @callback  callback
 * @param     {object}      res       httpreq response
 * @param     {Error|null}  err       httpreq error
 * @param     {object}      options   httpreq options
 * @param     {function}    callback  `(err, data)`
 * @return    {void}
 */

function processResponse (res, err, options, callback) {
  var data = res && res.body || null;

  if (err) {
    doError ('request failed', err, res, options, callback);
    return;
  }

  if (res && res.statusCode >= 300) {
    doError ('HTTP error', null, res, options, callback);
    return;
  }

  try {
    data = JSON.parse (data);
    callback (null, data);
  } catch (e) {
    doError ('invalid response', e, res, options, callback);
  }
}


/**
 * Communicate with API
 *
 * @callback  callback
 * @param     {string}    method    HTTP method, GET, POST, etc
 * @param     {string}    path      Request path
 * @param     {object}    props     Send query or POST parameters
 * @param     {function}  callback  `(err, data)`
 * @return    {void}
 */

function talk (method, path, props, callback) {
  var options = {
    url: (config.baseURL || 'https://requestb.in/api/v1/') + path,
    method: method,
    parameters: props,
    timeout: config.timeout || 5000,
    localAddress: config.iface,
    headers: {
      'Accept': 'application/json',
      'User-Agent': (config.userAgent || 'requestbin.js (https://github.com/fvdm/nodejs-requestbin)')
    }
  };

  if (typeof props === 'function') {
    callback = props;
    props = {};
  }

  httpreq.doRequest (options, function (err, res) {
    processResponse (res, err, options, callback);
  });
}


/**
 * Set configuration
 *
 * @param   {object}  props  Config parameters
 * @return  {void}
 */

function methodConfig (props) {
  var name;

  for (name in props) {
    config [name] = props [name];
  }
}


/**
 * Create request instance
 *
 * @callback  callback
 * @param     {boolean}   [isPrivate=false]  Make instance private
 * @param     {function}  callback           `(err, data)`
 * @return {void}
 */

function methodCreate (isPrivate, callback) {
  var props = {};

  if (typeof isPrivate === 'function') {
    callback = isPrivate;
  } else if (isPrivate === true) {
    props.private = 'true';
  }

  talk ('POST', 'bins', props, callback);
}


/**
 * Get a request instance
 *
 * @callback  callback
 * @param     {string}    bin       Bin instance ID
 * @param     {function}  callback  `(err, data)`
 * @return    {void}
 */

function methodGet (bin, callback) {
  talk ('GET', 'bins/' + bin, callback);
}


/**
 * Get received requests
 *
 * @callback  callback
 * @param     {string}    bin       Bin instance ID
 * @param     {function}  callback  `(err, data)`
 * @return    {void}
 */

function methodRequests (bin, callback) {
  talk ('GET', 'bins/' + bin + '/requests', callback);
}


/**
 * Get one received request
 *
 * @callback  callback
 * @param     {string}    bin       Bin instance ID
 * @param     {string}    request   Request ID
 * @param     {function}  callback  `(err, data)`
 * @return    {void}
 */

function methodRequest (bin, request, callback) {
  talk ('GET', 'bins/' + bin + '/requests/' + request, callback);
}


/**
 * Interface methods
 *
 * @return {object} - Methods
 */

module.exports = {
  config: methodConfig,
  create: methodCreate,
  get: methodGet,
  requests: methodRequests,
  request: methodRequest
};
