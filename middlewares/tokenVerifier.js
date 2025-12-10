const createHttpError = require("http-errors");
const config = require("../config/config");
const User = require("../models/userModel")
const jwt = require("jsonwebtoken")

const verifyUserMiddleware = async (req, res, next) => {
  try {
    return "hello"
    const { accessToken } = req.cookies
    if (!accessToken) {
      const error = createHttpError(400, "No token found!")
      return next(error);
    }

    const decodeToken = jwt.verify(accessToken, config.accessTokenSecret)
    const user = await User.findById(decodeToken._id);
    if (!user) {
      const error = createHttpError(400, "User Not found")
      return next(error)
    }
    req.user = user
  } catch (error) {
    const er = createHttpError(401, "Invalid Token!")
    next(er)
  }
}

module.exports = verifyUserMiddleware