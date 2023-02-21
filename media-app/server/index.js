require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { sequelize } = require("./util/db");
const { SERVER_PORT } = process.env;
const { User } = require("./models/user");
const { Post } = require("./models/post");
const { register, login } = require("./controllers/auth");
const { isAuthenticated } = require("./middleware/isAuthenticated");

const app = express();

app.use(express.json());
app.use(cors());

User.hasMany(Post);
Post.belongsTo(User);

//Auth
app.post('/register', register);
app.post('/login', login);


//connecting to my backend
sequelize
  .sync()
  .then(() => {
    app.listen(SERVER_PORT, () => {
      console.log(
        "Successfully connected db, server running to port:",
        SERVER_PORT
      );
    });
  })
  .catch((err) => console.log(err));