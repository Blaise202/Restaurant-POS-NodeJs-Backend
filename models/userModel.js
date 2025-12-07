const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
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

// hash the password before saving the data
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt)
})

module.exports = mongoose.model("user", userSchema) 