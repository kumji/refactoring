'use strict';

var chai = require('chai'),
    expect = chai.expect,
    chaiHttp = require('chai-http');

chai.use(chaiHttp);

process.env.MONGO_URL = 'mongodb://localhost/checkout_test';
require(__dirname + '/../server.js');
var mongoose = require('mongoose');
var Stock = require(__dirname + '/../api/models/stock');

describe('stock add', function() {
  after(function(done) {
    mongoose.connection.db.dropDatabase(function(err){
      if (err) throw err;
      done();
    });
  });

  it('should be able to add stock', function(done){
    chai.request('localhost:3000/api/stocks')
      .post('/add')
      .send({item:'jeans', qty:3})
      .end(function(err, res){
        expect(err).to.eql(null);
        expect(res.body.item).to.eql('jeans');
        expect(res.body.qty).to.eql(3);
        done();
      });
  });
});


describe('stock list', function() {
  after(function(done) {
    mongoose.connection.db.dropDatabase(function(err){
      if (err) throw err;
      done();
    });
  });

  it('should be able to get a stocklist', function(done){
    chai.request('localhost:3000/api/stocks')
      .get('/list')
      .end(function(err, res){
        expect(err).to.eql(null);
        expect(Array.isArray(res.body)).to.eql(true);
        done();
      });
  });
});


describe('change stock', function() {
  beforeEach(function(done){
    var testStock = new Stock({item:'test', qty:1});
    testStock.save(function(err, data) {
      if (err) throw err;
      this.testStock = data;
      done();
    }.bind(this));
  });

  it('should be able to update stock', function(done){
    chai.request('localhost:3000/api/stocks')
      .put('/update/'+ this.testStock.item)
      .send({qty:2})
      .end(function(err, res){
        expect(err).to.eql(null);
        done();
      });
  });

  it('should be able to delete stock', function(done){
    chai.request('localhost:3000/api.stocks')
      .delete('/delete/' + this.testStock.item)
        .end(function(err, res) {
          expect(err).to.eql(null);
          done();
        });
  });
});


