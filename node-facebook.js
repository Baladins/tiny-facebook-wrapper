
var request = require('request');

/**
 * Custom Facebook API Client
 */

"use strict"; //js-hint is fuck up ^^

module.exports = function(logger) {

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
        logger.info('facebook response: ' + body);
        callback(body)
      } else {
        logger.error('error: ' + body);
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
   function get(url, accessToken, params, callback) {
    var options = {};
    if(params) {
      url += '?fields=' + params.fields
    }
    if (accessToken) {
      url += '?access_token=' + accessToken
    }
    options.url = apiUrl + url
    logger.info('facebook request(get): ' + options.url);
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
   function post(url, accessToken, data, callback) {
    var options = {};
    if (accessToken) {
      url += '?access_token=' + accessToken
    }
    options.url = apiUrl + url
    options.body = data
    logger.info('facebook request(post): ' + options.url);
    callApi(options, callback);
  }

  function del(url, accessToken, data, callback) {
  }

  return {
    'get': get,
    'post': post,
    'del': del
  }

}