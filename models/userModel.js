const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: email,
    required: true,
    validate: {
      validator: function (v) {
        return /\S+@\S+\.\S+/.test(v); //regex email validation
      },
      message: "Invalid email format"
    }
  },
  phone: {
    type: String,
    required: false,
    validate: {
      validator: function (v) {
        return /\d{10}/; //regex pone validation
      },
      message: "Invalid phone number format"
    }
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  }
}, { timestamps: true })


module.exports = mongoose.model("user", userSchema)