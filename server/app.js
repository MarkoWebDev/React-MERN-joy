const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const PORT = 5001;
const server = express();
server.use(cors({ origin: "http://localhost:3000", credentials: true }));
server.use(express.json());

server.use("/", require("./routes/routes"));

server.listen(PORT, () => console.log("Server started " + PORT));
