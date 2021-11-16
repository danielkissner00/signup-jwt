const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  token = req.header("auth-token");
  if (!token) return res.status(401).send("Acess denied");

  try {
    //   The jwt verify === the _id it was holding in the token.
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    // Then were assigning it to the req.user.
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send("error");
  }
};
