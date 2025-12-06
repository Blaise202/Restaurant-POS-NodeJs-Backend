require("dotenv").config();
const express = require("express")
const connetctDb = require("./config/database")
const app = express()

const PORT = process.env.PORT;
connetctDb();

app.get("/", (request, response) => {
  response.json({ message: "POS Server is working!" });
})

app.listen(PORT, () => {
  console.log(`POS server is listening on port ${PORT}`);
})