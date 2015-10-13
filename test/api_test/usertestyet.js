'use strict';

var chai = require('chai'),
    expect = chai.expect,
    chaiHttp = require('chai-http');

chai.use(chaiHttp);

process.env.MONGO_URL = 'mongodb://localhost/checkout_test';
var server = require(__dirname + '/../../server.js');
var mongoose = require('mongoose');
var User = require(__dirname + '/../../api/models/user');
var bcrypt = require('bcrypt');

describe('users sign-up', function(){
  after(function(done) {
    server.close();
    mongoose.connection.db.dropDatabase(function(err){
      if (err) throw err;
      done();
    });
  });

  it('should be able to create a user', function(done) {
    chai.request('localhost:3000/api/users')
      .post('/signup')
      .send({username: 'dearkj', passworkd: 'kumji'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.token).to.have.length.above(0);
        done();
      });
  });
});

describe('users sign-in', function(){
  before(function(done) {
    var user = new User;
    user.username = 'test';
    user.generateHash('qwe123', function(err, res) {
      if (err) throw err;
      user.save(function(err, data){
        if (err) throw err;
        user.generateToken(function(err, token){
          if (err) throw err;
          this.token = token;
          done();
        }.bind(this));
      }.bind(this));
    }.bind(this));
  });

  it('should be able to sign-in', function(done) {
    chai.request('localhost:3000/api/users')
      .get('/signin')
      .auth('test', 'qwe123')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.token).to.have.length.above(0);
        done();
      });
  });
});
