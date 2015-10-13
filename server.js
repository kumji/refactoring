var express = require('express');
var app = express();
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/checkout_dev');
process.env.APP_SECRET = process.env.APP_SECRET || 'itwillbeawesomeappever';


app.use(express.static(__dirname + '/build'));
var usersRouter = require(__dirname + '/api/routes/users_routes');
var stocksRouter = require(__dirname + '/api/routes/stocks_routes');
app.use('/api/users', usersRouter);
app.use('/api/stocks', stocksRouter);

var port = process.env.PORT || 3000;
module.exports = app.listen(port, function() {
  console.log('server up on port: ' +  port);
});
