require("dotenv").config();
const express = require("express")
const connetctDb = require("./config/database")
const config = require("./config/config");
const globalErrorHandler = require("./middlewares/globalErrorHandler");
const createHttpError = require("http-errors");
const cookieParser = require("cookie-parser");
const app = express()

const PORT = config.port;
connetctDb();

// Middleware
app.use(express.json()) // parse incoming request in json format
app.use(cookieParser())

// Root endpoint
app.get("/", (request, response) => {
  response.json({ message: "POS Server is working!" });
})

// Other endpoints
app.use("/api/user", require("./routes/userRoute"))

// Call global error handler
app.use(globalErrorHandler)

// Server
app.listen(PORT, () => {
  console.log(`POS server is listening on port ${PORT}`);
})