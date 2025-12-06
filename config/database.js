const mongoose = require("mongoose")
const config = require("./config")

const connetctDb = async () => {
  try {
    const conn = await mongoose.connect(config.databaseURI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Connection Error: ${error.message}`);
    process.exit();
  }
}

module.exports = connetctDb;