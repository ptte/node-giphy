var http = require('http');

var GiphyApiWrapper = function (api_key) {
  this._base_url = 'api.giphy.com';
  this._api_version = 'v1';
  this._api_key = api_key;
};

// Endpoints //

// Limit max 100, default 25
GiphyApiWrapper.prototype.search = function (query, limit, offset, rating, callback) {
  var query = query || null,
    limit = limit || 25,
    offset = offset || 0,
    rating = rating || 'g',
    path = 'gifs/search';
  
  var args = new Array(
    'q=' + query,
    'limit=' + limit,
    'offset=' + offset,
    'rating=' + rating
  ).join('&');

  if (query === null) {
    callback(new Error('No query'), null);
    return;
  }

  this._call(path, args, callback);
}

// Grab a single giphy image by its unique ID
GiphyApiWrapper.prototype.getById = function (id, callback) {
  var path = 'gifs/' + id;

  if (id === undefined) {
    callback(new Error('ID is not set'), null);
    return;
  }

  this._call(path, new Array(), callback);
}

// Grab many images by their IDs
GiphyApiWrapper.prototype.getByIds = function (ids, callback) {
  var path = 'gifs',
    ids = ids || null;

  if (ids === null) {
    callback(new Error('IDs are not set'), null);
    return;
  }

  var args = 'ids=' + ids.join(',');

  this._call(path, args, callback);
}

// ..
GiphyApiWrapper.prototype.translate = function (query, callback) {
  var query = query || null,
    path = 'gifs/translate';

  if (query === null) {
    callback(new Error('No query'), null);
    return;
  }

  this._call(path, 's=' + query, callback);
}

// Grab a random image by the tag name
GiphyApiWrapper.prototype.random = function (tag, callback) {
  var arg = 'tag=' + tag || null,
    path = 'gifs/random';

  this._call(path, arg, callback);
}

// Grab some trending images
GiphyApiWrapper.prototype.trending = function (limit, callback) {
  var arg = 'limit=' + limit || null,
    path = 'gifs/trending';

  this._call(path, arg, callback);
}

// Internal //

// API call wrapper
GiphyApiWrapper.prototype._call = function (path, args, callback) {
  var path = this._buildPath(path, args);

  this._request(this._base_url, path, function (err, data) {
    if (err) {
      return callback(err, null);
    }

    return callback(null, JSON.parse(data));
  });
}

GiphyApiWrapper.prototype._buildPath = function (path, args) {
  var path = '/' + this._api_version + '/' + path;
  path += '?api_key=' + this._api_key;
  path += '&' + args;

  return path;
}

GiphyApiWrapper.prototype._request = function (host, path, callback) {
  var options = {
    hostname: host,
    port: 80,
    path: path,
    method: 'GET'
  }

  var req = http.request(options, function (res) {
    res.setEncoding('utf8');
    if (res.statusCode !== 200) {
      console.log('error', res.statusCode);
      return callback(new Error('Request failed'), null);
    }

    var data = [];

    res.on('data', function (chunk) {
      // Has chunk of data
      data.push(chunk);
    }).on('end', function () {
      data_string = data.join('');
      return callback(null, data_string);
    });
  });

  // Catch error on request
  req.on('error', function(e) {
    return callback(new Error(e.message), null);
  });

  req.end();
}

module.exports = function (api_key) {
  return new GiphyApiWrapper(api_key);
}
