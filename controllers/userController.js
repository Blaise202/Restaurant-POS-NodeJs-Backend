const createHttpError = require("http-errors");
const User = require("../models/userModel")

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

const login = async (req, response, next) => {

}

module.exports = { users, register, login }