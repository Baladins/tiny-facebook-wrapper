/**
 * Tiny Facebook Wrapper Tests.
 * @version 0.0.1
 * @author David Cunha
 */

 var facebook = require('../index')
 , assert = require('assert');

 var options = {
  userId : '', //insert a valid user ID
  accessToken: '' //insert a valid accessToken (graph api explorer, passport.js, everyauth, ...)
};

describe('facebook', function() {

  /**
   * Test getting user basic info with fields
   */
   it('should be able to get public info (name, gender)', function(done) {
    this.timeout(5000);

    facebook.get(options.userId, null, {fields : 'name,gender'}, function(error, res) {
      if(error) {
        console.log('error: ' + error);
      } else {
       assert.ok(true, JSON.parse(res).name)
       assert.ok(true, JSON.parse(res).gender)
       console.log('response: ' + res);
       done();
     }
   });
  });

  /**
   * Test getting user basic info without fields
   */
   it('should be able to get public info (without fields)', function(done) {
    this.timeout(5000);

    facebook.get(options.userId, null, function(error, res) {

      if(error) {
        console.log('error: ' + error);
      } else {
       assert.ok(true, JSON.parse(res).name)
       assert.ok(true, JSON.parse(res).gender)
       console.log('response: ' + res);
       done();
     }
   });
  });

  /**
   * Test getting user friends
   */
   it('should be able to get user\'s friends', function(done) {
    this.timeout(5000);

    facebook.get(options.userId + '/friends', options.accessToken, function(error, res) {
      if(error) {
        console.log('error: ' + error);
      } else {
        assert.ok(true, JSON.parse(res).data)
        console.log('response: ' + res);
        done();
      }
    });
  });

  /**
   * Test posting in feed
   */
   it('should be able to post message in feed', function(done) {
    this.timeout(5000);

    facebook.post(options.userId + '/feed', options.accessToken, {message : 'I love Node.js!'}, function(error, res) {
      if(error) {
        console.log('error: ' + error);
      } else {
        assert.ok(true, JSON.parse(res).id);
        console.log('response: ' + res);
        done();
      }
    });
  });

 });