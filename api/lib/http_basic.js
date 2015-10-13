module.exports = exports = function(req, res, next) {
  var userPassEncode = (req.headers.authorization || ' :').split(' ')[1];
  var userPassBuf = new Buffer(user)
}