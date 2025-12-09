const createHttpError = require("http-errors");
const User = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const config = require("../config/config");

const users = async (request, response, next) => {
  const users = await User.find()
  if (users.length == 0) {
    const error = createHttpError(404, "No users found");
    next(error)
  }
  response.status(201).json({
    count: users.length,
    message: "users fethed successfully",
    users: users
  })
}

const register = async (req, res, next) => {
  try {

    const { name, email, phone, password, role } = req.body;
    if (!name || !email || !phone || !password || !role) {
      const error = createHttpError(400, "All fields are required");
      next(error)
    }

    const checkUser = await User.findOne({ email });
    if (checkUser) {
      const error = createHttpError(400, "Email already exists");
      next(error)
    }

    const user = { name, email, phone, password, role };
    const newUser = new User(user);
    await newUser.save();

    res.status(201).json({
      success: true,
      message: "New user created",
      data: newUser
    })

  } catch (error) {
    next(error);
  }
}

const login = async (req, res, next) => {
  try {

    const { email, password } = req.body
    if (!email || !password) {
      const error = createHttpError(400, "All fields are required")
      next(error)
    }

    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      const error = createHttpError(401, "Invalid creadentials")
      next(error)
    }

    const checkCreadentials = await bcrypt.compare(password, checkUser.password);
    if (!checkCreadentials) {
      const error = createHttpError(401, "Invalid creadentials")
      next(error)
    }

    const accessToken = jwt.sign({ _id: checkUser._id }, config.accessTokenSecret, { expiresIn: '1d' })

    res.cookie('accessToken', accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
      sameSite: "none",
      secure: true
    })

    res.status(200).json({
      success: true,
      message: "User logged-in Successfully",
      data: checkUser
    })

  } catch (error) {
    next(error)
  }
}

module.exports = { users, register, login }