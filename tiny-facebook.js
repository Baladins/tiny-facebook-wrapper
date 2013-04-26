
var request = require('request')
  , util = require('util')
  , qs = require('querystring');

/**
 * Tiny Facebook Wrapper
 */

 var apiUrl = 'https://graph.facebook.com/';

  /**
   * Call the Facebook API with the options object
   * and returns the json response to the callback
   *
   * @param {object} options
   * @param {function} callback
   */
   function callApi(options, callback) {
    request(options, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        callback(false, body);
      } else {
        callback(new Error(body), null);
      }
    });
  }

  /**
   * Get wrapper
   *
   * @param {string} url
   * @param {string} accessToken
   * @param {object or function} params
   * @param {function} callback
   */
   exports.get = function(url, accessToken, params, callback) {
    if (typeof params === 'function') {
      callback = params;
      params   = null;
    }
    if(params) url += '?fields=' + params.fields;
    if (accessToken) url += '?access_token=' + accessToken;

    var options = {};
    options.url = apiUrl + url;

    console.log('facebook request(get): ' + options.url);
    callApi(options, callback);
  };

  /**
   * Post wrapper
   *
   * @param {string} url
   * @param {string} accessToken
   * @param {object} data
   * @param {function} callback
   */
   exports.post = function(url, accessToken, data, callback) {
    if (accessToken) url += '?access_token=' + accessToken;

    var options = {};
    options.url = apiUrl + url;
    options.method = 'POST';
    options.body = qs.stringify(data);

    console.log('facebook request(post): ' + options.url + ' :body: ' + options.body);
    callApi(options, callback);
  };
