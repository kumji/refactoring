var express = require('express');
var Stock = require(__dirname + '/../models/stock');
var jsonParser = require('body-parser').json();
var stockRouter = module.exports = exports = express.Router();


stockRouter.post('/add', jsonParser, function(req,res) {
  var newStock = new Stock();
  newStock.item = req.body.item;
  newStock.qty = req.body.qty;
  newStock.save(function(err, data) {
    if(err) return handleError(err, res);
    res.json(data);
  });
});

stockRouter.get('/list', function(req,res) {
  Stock.find({}, function(err, data) {
    if (err) return handleError(err, res);
    res.json(data);
  });
});


stockRouter.put('/update/:item', jsonParser, function(req, res){
  Stock.findOne({'item': req.params.item}, function(err, stock) {
    if (err) return handleError(err, res);
    stock.item = req.body.item;
    stock.qty = req.body.qty;
    stock.save(function(err, data){
      if (err) return handleError(err, res); 
      res.json(data);
    });
  });
});

stockRouter.delete('/delete/:item', jsonParser, function(req, res){
  Stock.remove({'': req.params._id}, function(err){
    if (err) return handleError(err, res); 
    console.log('removed' + req.params.item + 'stock');
    res.json({msg:'success'});
  });
});
