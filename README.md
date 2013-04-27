Tiny Facebook Wrapper
=====================
Tiny Facebook Wrapper is the smallest facebook client with the longest name that you will ever see. It doesn't care about authentication because passport.js can handle this for you. But don't worry, this module supports the basic operations you need for your project.

## Install
    $ npm install tiny-facebook-wrapper

## Get request

```js
var facebook = require('tiny-facebook-wrapper');

facebook.get("/me", yourToken, {fields : name,gender}, function(error, res) {
  if(!error) {
    console.log(res); //json response
  }
});
```

or

```js
facebook.get("/me", yourToken, function(error, callback) {
  if(!error) {
    console.log(res); //json response
  }
});
```

## Post request

```js
var facebook = require('tiny-facebook-wrapper');

facebook.post("/me", yourToken, {message : "It's a trap"}, function(error, res) {
  if(!error) {
    console.log(res); //json response
  }
});
```

## TODOS

 - Delete method
 - More unit tests

## Testing

Before running any test, you need to add a valid accessToken which you can get via [passport.js](https://github.com/jaredhanson/passport) or [everyauth](https://github.com/bnoguchi/everyauth). 

```js
    mocha test/ -R spec //I will hack a makefile for this
```

## License

MIT