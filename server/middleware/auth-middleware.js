module.exports = function (req, res, next) {
  try {
    // const authorizationHeader = req.headers.authorization;
    const { user } = req.body;
    if (user) {
      if (user === "admin") {
        next();
      } else {
        res.json({ message: "User Not found" });
      }
    } else {
      res.json({ message: "Wrong user details" });
    }
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: "Authorization Faild",
    });
  }
};
