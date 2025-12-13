const mongoose = require("mongoose")

const tableSchema = mongoose.Schema({
  tableNo: {
    type: Number,
    required: true,
    unique: true
  },
  status: {
    type: String,
    required: true,
    default: "Vacant"
  },
  currentOrder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order"
  }
}, { timestamps: true })

module.exports = mongoose.model("Table", tableSchema)