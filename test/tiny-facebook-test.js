
/**
 *  Tiny Facebook Wrapper Tests
 */

var facebook = require('../tiny-facebook.js')
  , assert = require('assert');

var options = {
  userId : '', //insert a valid user ID
  accessToken: '' //insert a valid accessToken (graph api explorer, passport.js, everyauth, ...)
};

describe('facebook', function() {

  /**
   * Test getting user basic info
   */
   it('should be able to get public info (name, gender)', function(done) {

    facebook.get(options.userId, null, {fields : 'name,gender'}, function(error, callback) {

      if(error) {
        console.log('error: ' + error);
      } else {
       assert(true, JSON.parse(callback).name);
       assert(true, JSON.parse(callback).gender);
       done();
     }
   });
  });

  /**
   * Test posting in feed
   */
   it('should be able to post message in feed', function(done) {

    facebook.post(options.userId + '/feed', options.accessToken, {message : 'I love Node.js!'}, function(error, callback) {

      if(error) {
        console.log('error: ' + error);
      } else {
       assert(true, JSON.parse(callback).id);
       done();
     }
   });
  });

 });