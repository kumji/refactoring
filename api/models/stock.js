var mongoose = require('mongoose');

var stockSchema = new mongoose.Schema({
  item: String,
  qty: Number
})

module.exports = exports = mongoose.model('Stock', stockSchema);