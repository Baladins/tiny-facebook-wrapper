/**
 * Tiny Facebook Wrapper Tests.
 * @version 0.0.1
 * @author David Cunha
 */

 var facebook = require('../index')
 , assert = require('assert');

 var options = {
  userId : '100002166486847', //insert a valid user ID
  accessToken: 'BAACEdEose0cBAFXMT1zecGh5VJuHPLxOo6PGhjkmKRu4NYkaGPR5n1ZChKFNrn2TqgnI5mYPzoUij6zZCRN2G9fSZCO5u47JV6A34bggmhHAN7sUZCoJLotthWvcCNBY9xQ2kwykCYttGHGiobqLDYswLa4glaelF4nSLua9gc5PkavZCbxejnvhSW1ZAng5sHcvZAZApXER6LpPQAnqZCSZCXWAOa5bLVZBjZBkE6tObiyLzQZDZD' //insert a valid accessToken (graph api explorer, passport.js, everyauth, ...)
};

describe('facebook', function() {

  /**
   * Test getting user basic info
   */
   it('should be able to get public info (name, gender)', function(done) {
    this.timeout(5000);

    facebook.get(options.userId, null, {fields : 'name,gender'}, function(error, res) {

      if(error) {
        console.log('error: ' + error);
      } else {
       console.log('response: ' + res);
       assert(true, JSON.parse(res).name);
       assert(true, JSON.parse(res).gender);
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
        console.log('response: ' + res);
       assert(true, JSON.parse(res).id);
       done();
     }
   });
  });

 });