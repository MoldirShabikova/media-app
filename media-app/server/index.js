require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { sequelize } = require("./connect");
const { SERVER_PORT } = process.env;


const { register, login } = require("./controllers/auth");
const app = express();
app.use(express.json());
app.use(cors());

app.listen(SERVER_PORT, () =>
  console.log(`Server running on port ${SERVER_PORT}`)
);
