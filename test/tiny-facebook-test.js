/**
 * Tiny Facebook Wrapper Tests.
 * @author David Cunha
 */

var facebook = require('../index')
  , assert = require('assert');

var options = {
  userId : '', //insert a valid user ID
  accessToken: '' //insert a valid accessToken (graph api explorer, passport.js, everyauth, ...)
};

describe('user', function () {

  /**
   * Get user basic info with fields
   */
  it('should be able to get public info (name, gender)', function (done) {
    this.timeout(5000);

    facebook.get(options.userId, {fields : ['name', 'gender']}, function (error, res) {
      if (error) {
        console.log('error: ' + error);
      } else {
        assert.ok(true, JSON.parse(res).name);
        assert.ok(true, JSON.parse(res).gender);
        console.log('response: ' + res);
        done();
      }
    });
  });

  /**
   * Get user basic info without fields
   */
  it('should be able to get public info (without fields)', function (done) {
    this.timeout(5000);

    facebook.get(options.userId, function (error, res) {

      if (error) {
        console.log('error: ' + error);
      } else {
        assert.ok(true, JSON.parse(res).name);
        assert.ok(true, JSON.parse(res).gender);
        console.log('response: ' + res);
        done();
      }
    });
  });

  /**
   * Get user friends
   */
  it('should be able to get user\'s friends', function (done) {
    this.timeout(5000);

    facebook.get(options.userId + '/friends', options.accessToken, function (error, res) {
      if (error) {
        console.log('error: ' + error);
      } else {
        assert.ok(true, JSON.parse(res).data);
        console.log('response: ' + res);
        done();
      }
    });
  });

  /**
   * Post in feed
   */
  var postId;
  it('should be able to post message in feed', function (done) {
    this.timeout(5000);

    facebook.post(options.userId + '/feed', options.accessToken, {message : 'I love Node'}, function (error, res) {
      if (error) {
        console.log('error: ' + error);
      } else {
        assert.ok(true, JSON.parse(res).id);
        postId = JSON.parse(res).id;
        console.log('response: ' + res);
        done();
      }
    });
  });

  /**
   * Delete post in feed
   */
  it('should be able to delete message in feed', function (done) {
    this.timeout(5000);

    facebook.del(postId, options.accessToken, function (error, res) {
      if (error) {
        console.log('error: ' + error);
      } else {
        assert.ok(true, 'true');
        console.log('response: ' + res);
        done();
      }
    });
  });

  /**
   * Fail with a no string url
   */
  it('should not be able to send a no string url', function (done) {
    this.timeout(5000);

    facebook.get({object: 'object'}, null, function (error, res) {
      if (error) {
        console.log('error: ' + error);
        assert.equal(error, 'Error: The url must be a string');
      }
    });

    facebook.post({object: 'object'}, options.accessToken, {message : 'I love Node'}, function (error, res) {
      if (error) {
        console.log('error: ' + error);
        assert.equal(error, 'Error: The url must be a string');
      }
    });

    facebook.del({object: 'object'}, options.accessToken, function (error, res) {
      if (error) {
        console.log('error: ' + error);
        assert.equal(error, 'Error: The url must be a string');
        done();
      }
    });
  });

  /**
   * Fail with a not valid accessToken
   */
  it('should not be able to send a not valid accessToken', function (done) {
    this.timeout(5000);

    facebook.post(options.userId + '/feed', null, {message : 'I love Node'}, function (error, res) {
      if (error) {
        console.log('error: ' + error);
        assert.equal(error, 'Error: You must enter a valid token');
      }
    });

    facebook.del('dummyId', null, function (error, res) {
      if (error) {
        console.log('error: ' + error);
        assert.equal(error, 'Error: You must enter a valid token');
        done();
      }
    });
  });

  /**
   * Fail with not valid data
   */
  it('should not be able to send invalid data', function (done) {
    this.timeout(5000);

    facebook.post(options.userId + '/feed', options.accessToken, 'message', function (error, res) {
      if (error) {
        console.log('error: ' + error);
        assert.equal(error, 'Error: The data must be an object');
        done();
      }
    });
  });
});