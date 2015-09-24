var httpreq = require ('httpreq');
var config = {
  timeout: 5000,
  iface: null
};

function talk (method, path, props, callback) {
  var options = {
    url: 'http://requestb.in/api/v1/' + path,
    method: method,
    parameters: props,
    timeout: parseInt (config.timeout, 10) || 5000,
    localAddress: config.iface,
    headers: {
      'User-Agent': 'requestbin.js (https://www.npmpjs.com/package/requestbin)',
      Accept: 'application/json'
    }
  };

  if (typeof props === 'function') {
    callback = props;
    props = {};
  }

  httpreq.doRequest (options, function (err, res) {
    var data = res && res.body || null;
    var error = null;

    if (err) {
      error = new Error ('request failed');
      error.error = err;
      callback (error);
      return;
    }

    if (res && res.statusCode >= 300) {
      error = new Error ('HTTP error');
      return;
    }

    try {
      data = JSON.parse (data);
    } catch (e) {
      error = new Error ('invalid response');
    }

    if (error) {
      error.httpCode = res.statusCode;
      error.request = options;
      error.response = {
        headers: res.headers,
        body: data
      };
      callback (error);
      return;
    }

    callback (null, data);
  });
}

module.exports = {
  config: function (props) {
    var name;
    for (name in props) {
      config [name] = props [name];
    }
  },

  create: function (isPrivate, callback) {
    var props = {};

    if (typeof isPrivate === 'function') {
      callback = isPrivate;
    } else if (isPrivate === true) {
      props.private = 'true';
    }

    talk ('POST', 'bins', props, callback);
  },

  get: function (bin, callback) {
    talk ('GET', 'bins/' + bin, callback);
  },

  requests: function (bin, callback) {
    talk ('GET', 'bins/' + bin + '/requests', callback);
  },

  request: function (bin, request, callback) {
    talk ('GET', 'bins/' + bin + '/requests/' + request, callback);
  }
};
