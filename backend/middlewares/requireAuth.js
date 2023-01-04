const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

const requireAuth = async (req, res, next) => {
  // verify authentication of user, whether already logged in or not

  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);

    // on successfully verification return _id of logged in user

    req.user = await User.findOne({ _id }).select("_id");
    await next();
  } catch (error) {
    res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports = requireAuth;
