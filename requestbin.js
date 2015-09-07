var httpreq = require ('httpreq');

module.exports = {
  create: function (isPrivate, callback) {
    var props = {};

    if (typeof isPrivate === 'function') {
      var callback = isPrivate;
    } else if (isPrivate === true) {
      props.private = 'true';
    }

    talk ('POST', 'bins', props, callback);
  },

  get: function (bin, callback) {
    talk ('GET', 'bins/'+ bin, callback);
  },

  requests: function (bin, callback) {
    talk ('GET', 'bins/'+ bin +'/requests', callback);
  },

  request: function (bin, request, callback) {
    talk ('GET', 'bins/'+ bin +'/requests/'+ request, callback);
  }
};

function talk (method, path, props, callback) {
  if (typeof props === 'function') {
    var callback = props;
    var props = {};
  }

  var options: {
    url: 'https://requestb.in/api/v1/' + path,
    method: method,
    parameters: props,
    headers: {
      'User-Agent': 'requestbin.js (https://npmpjs.org/package/requestbin)',
      Accept: 'application/json'
    }
  };

  var query = null;

  httpreq.doRequest (options, function (err, res) {
    var data = res && res.body || null;
    var error = null;

    if (err) {
      callback (err);
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