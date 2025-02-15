/**
 * Tiny Facebook Wrapper.
 * @author David Cunha
 */

var request = require('request'), 
    qs = require('querystring');

var apiUrl = 'https://graph.facebook.com/';
var options = {};

/**
 *
 * Facebook constructor
 *
 * @param {string} url
 * @param {string} method
 * @param {object or function} data
 * @param {function or undefined} callback
 */
function FB(url, method, data, callback) {
  this.options = options || {};
  this.options.url = apiUrl + url;
  this.options.method = method;
  if (typeof data === 'function') {
    callback = data;
    data = null;
  }
  if (data) { this.options.form = data; }

  return this.callApi(this.options, callback);
}

/**
 * Call the Facebook API with the options object
 * and returns the json response to the callback
 *
 * @param {object} options
 * @param {function} callback
 */
FB.prototype.callApi = function (options, callback) {
  request(options, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      callback(false, body);
    } else {
      callback(new Error(body));
    }
  });
};

/**
 * Get wrapper
 *
 * @param {string} url
 * @param {string or function} accessToken
 * @param {object or function or undefined} params
 * @param {function or undefined} callback
 */
exports.get = function (url, limit, accessToken, params, callback) {
    if (typeof params === 'function') {
        callback = params;
        params = null;
    }
    if (typeof limit === 'function') {
        callback = limit;
        limit = null;
    }
    if (typeof accessToken === 'object') {
        params = accessToken;
        accessToken = null;
    }
    if (typeof accessToken === 'function') {
        callback = accessToken;
        accessToken = null;
    }
    if (typeof url !== 'string') { return callback(new Error('The url must be a string')); }
    url += '?limit=' + limit + '&access_token=' + accessToken;
    if (params) { url += '&fields=' + params.fields.join(','); }
    return new FB(url, 'GET', callback);
};

/**
 * Search wrapper
 *
 * @param {string} url
 * @param {string or function} accessToken
 * @param {object or function or undefined} params
 * @param {function or undefined} callback
 */
exports.search = function (limit, accessToken, hashtag, params, callback) {
    var url = 'search';

    if (typeof params === 'function') {
        callback = params;
        params = null;
    }
    if (typeof limit === 'function') {
        callback = limit;
        limit = null;
    }
    if (typeof accessToken === 'object') {
        params = accessToken;
        accessToken = null;
    }
    if (typeof accessToken === 'function') {
        callback = accessToken;
        accessToken = null;
    }

    url += '?q=%23' + hashtag + '&type=post&limit=' + limit + '&access_token=' + accessToken;
    if (params) { url += '&fields=' + params.fields.join(','); }
    return new FB(url, 'GET', callback);
};

/**
 * Post wrapper
 *
 * @param {string} url
 * @param {string} accessToken
 * @param {object} data
 * @param {function} callback
 */
exports.post = function (url, accessToken, data, callback) {
  if (!accessToken) { return callback(new Error('You must enter a valid token')); }
  if (typeof url !== 'string') { return callback(new Error('The url must be a string')); }
  if (typeof data !== 'object') { return callback(new Error('The data must be an object')); }
  url += '?access_token=' + accessToken;
  return new FB(url, 'POST', data, callback);
};

/**
 * Delete wrapper
 *
 * @param {string} url
 * @param {string} accessToken
 * @param {function} callback
 */
exports.del = function (url, accessToken, callback) {
  if (!accessToken) { return callback(new Error('You must enter a valid token')); }
  if (typeof url !== 'string') { return callback(new Error('The url must be a string')); }
  url += '?method=delete&access_token=' + accessToken;
  return new FB(url, 'GET', callback);
};
