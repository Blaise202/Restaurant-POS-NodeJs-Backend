const mongoose = require("mongoose")
const { applyTimestamps } = require("./userModel")

const orderSchema = new mongoose.Schema({
  customerDetails: {
    name: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    guests: {
      typpe: Number,
      required: true
    }
  },
  orderStatus: {
    type: String,
    required: true
  },
  orderDate: {
    type: Date,
    default: Date.now()
  },
  bills: {
    total: {
      type: Number,
      required: true,
    },
    tax: {
      type: Number,
      required: true
    },
    totalWithTax: {
      type: Number,
      required: true
    }
  },
  items: []
}, { timestamps: true })

moodule.exports = mongoose.model("Order", orderSchema)