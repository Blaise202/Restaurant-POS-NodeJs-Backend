require("dotenv").config()

const config = Object.freeze({ // freeze makes the connection tools read-only
  port: process.env.PORT,
  databaseURI: process.env.MONGODB_URI,
  nodeEnv: process.env.NODE_ENV
})

module.exports = config;