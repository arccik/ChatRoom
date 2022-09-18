module.exports = function (err, req, res, next) {
  console.log("Error Middleware:", err);
  if (err) {
    return res.status(500).json({ message: err.message, errors: err.errors });
  }
};
