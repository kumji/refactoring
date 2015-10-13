var EventEmitter = require('events').EventEmitter;
var ee = new EventEmitter();
var User = require(__dirname + '/../models/user');
var handleError = require(__dirname + '/../lib/handleError');


ee.on('saveUser', function(newUser, req, res) {
  ee.emit('generateHash',newUser, req, res);
});

ee.on('generateHash', function(newUser, req, res) {
  newUser.generateHash(req.body.password, function(err, hash) {
    if (err) {
      console.log('generateHash error');
      return handleError(err, res);}
    ee.emit('saveUserToDB', newUser, req, res);
  });
});

ee.on('saveUserToDB', function(newUser, req, res) {
  findOne
  newUser.save(function(err, data) {
    if (err) {
      console.log('saveUserToDB error');
      return handleError(err, res);
    }
    ee.emit('generateToken', newUser, req, res);
  });  
});


ee.on('generateToken', function(user, req, res) {
  user.generateToken(function(err, token) {
    if (err) return handleError(err, res);
    res.json({token: token});
  });
});


ee.on('authenticate', function(user, password, req, res) {
  user.compareHash(password, function(err, hashRes) {
    if (err) return handleError.standard(err, res);
    if (!hashRes) return handleError.userPassMatch('password does not match', res);
    ee.emit('generateToken', user, req, res);
  });
});

module.exports = exports = ee;