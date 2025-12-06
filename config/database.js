const mongoose = require("mongoose")

const connetctDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Connection Error: ${error.message}`);
    process.exit();
  }
}

module.exports = connetctDb;