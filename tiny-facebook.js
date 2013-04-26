
var request = require('request');

/**
 * Tiny Facebook Wrapper
 */

"use strict"; //js-hint is fuck up ^^

var apiUrl = 'https://graph.facebook.com';

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
        console.log('facebook response: ' + body);
        callback(body)
      } else {
        console.log('error: ' + body);
        callback(new Error(body))
      }
    });
  }

  /**
   * Get wrapper
   *
   * @param {string} url
   * @param {string} accessToken
   * @param {object} params
   * @param {function} callback
   */
   exports.get = function(url, accessToken, params, callback) {
    var options = {};
    if(params) {
      url += '?fields=' + params.fields
    }
    if (accessToken) {
      url += '?access_token=' + accessToken
    }
    options.url = apiUrl + url
    console.log('facebook request(get): ' + options.url);
    callApi(options, callback);
  }

  /**
   * Post wrapper
   *
   * @param {string} url
   * @param {string} accessToken
   * @param {object} data
   * @param {function} callback
   */
   exports.post = function(url, accessToken, data, callback) {
    var options = {};
    if (accessToken) {
      url += '?access_token=' + accessToken
    }
    options.url = apiUrl + url
    options.body = data
    console.log('facebook request(post): ' + options.url);
    callApi(options, callback);
  }

  exports.del = function(url, accessToken, data, callback) {
  }
