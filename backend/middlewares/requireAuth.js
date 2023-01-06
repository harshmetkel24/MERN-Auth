const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

const requireAuth = async (req, res, next) => {
  // verify authentication of user, whether already logged in or not

  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];

  jwt.verify(token, process.env.SECRET, async (err, payload) => {
    if (err) {
      return res.status(401).json({ error: "Request is not authorized" });
    }
    const { _id } = payload;

    req.user = await User.findOne({ _id }).select("_id");
    await next();
  });
};

module.exports = requireAuth;
