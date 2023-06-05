const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const { mongoose } = require("mongoose");

const PORT = 5001;
const server = express();

server.use(cors({ origin: "http://localhost:3000", credentials: true }));
server.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connect to mongoDB"))
  .catch((error) => console.log(error));

server.use("/", require("./routes/routes"));

server.listen(PORT, () => console.log("Server started " + PORT));
