const config = require("../config/config")

const globalErrorHandler = (error, request, response, next) => {
  const statusCode = error.statusCode || 500
  return response.status(statusCode).json({
    status: statusCode,
    message: error.message,
    errorStack: config.nodeEnv === "development" ? error.stack : "",
  })
}


module.exports = globalErrorHandler