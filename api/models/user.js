var mongoose = require('mongoose');
var Stock = require(__dirname + '/stock');
var bcrypt = require('bcrypt');
var eat = require('eat')

var userSchema = new mongoose.Schema({
  username: { type: String, index: {unique:true}},
  basic: {
    username: String,
    password: String
  },
  email: String,
  address: String,
  cart: {
    item: {type: mongoose.Schema.Types.ObjectId, ref: 'Stock'}
  }
});

userSchema.methods.generateHash = function(password, callback) {
  bcrypt.hash(password, 8, function(err, hash) {
    if (err) return callback(err);
    this.basic.password = hash;
    callback(null, hash);
  }.bind(this));
};

userSchema.methods.generateToken = function(callback) {
  eat.encode({id: this._id}, process.env.APP_SECRET, callback);
}

userSchema.methods.compareHash = function(password, callback) {
  bcrypt.compare(password, this.basic.password, callback);
};

module.exports = exports = mongoose.model('User', userSchema);








// userSchema.methods.generateHash = function(password, callback) {
//   bcrypt.hash(password, 8, function(err, hash) {
//     if (err) return callback(err);
//     this.basic.password = hash;
//     callback(null, hash);
//   }.bind(this));
// };

// userSchema.methods.compareHash = function(password, callback) {
//   bcrypt.compare(password, this.basic.password, callback);
// };

// userSchema.methods.generateToken = function(callback) {
//   eat.encode({id: this._id}, process.env.APP_SECRET, callback);
// };