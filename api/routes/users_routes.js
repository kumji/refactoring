var express = require('express');
var User = require(__dirname + '/../models/user');
var handleError = require(__dirname + '/../lib/handleError.js');
var jsonParser = require('body-parser').json();
var userRouter = module.exports = exports = express.Router();
var userEventEmitter = require(__dirname + '/../lib/userEvent');

userRouter.post('/signup', jsonParser, function(req,res) {
  var newUser = new User();
  newUser.username = req.body.username;
  newUser.basic.username = req.body.username;
  newUser.address = req.body.address;
  newUser.email = req.body.email;
  userEventEmitter.emit('saveUser', newUser, req, res);
});

userRouter.get('/signin', function(req,res) {
  User.findOne({'basic.username': req.auth.username}, function(err, user) {
    if (err) return handleError(err, res);

    if(!user) {
      console.log('could not authenticat: ' + req.auth.username);
      return res.status(401).json({msg: 'could not authenticat'});
    }
    userEventEmitter.emit('authenticate', user, req, res);
  });
});
