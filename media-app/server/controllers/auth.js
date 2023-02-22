require("dotenv").config();

const jwt = require("jsonwebtoken");
const { SECRET } = process.env;
const { User } = require("../models/user");
const bcrypt = require("bcryptjs");

const createToken = (username, id) => {
  return jwt.sign(
    {
      username,
      id,
    },
    SECRET,
    {
      expiresIn: "2 days",
    }
  );
};

module.exports = {
  register: async (req, res) => {
    try {
      const { username,email, password, } = req.body;
      let foundUser = await User.findOne({ where: { username: username } });
      if (foundUser) {
        res.status(400).send("User already exists!");
      } else {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const newUser = await User.create({ username, password: hash, email });
        const token = createToken(
          newUser.dataValues.username,
          newUser.dataValues.id
        );
        console.log("TOOOOOOKEN", token);
        const exp = Date.now() + 1000 * 60 * 60 * 48;
        res.status(200).send({
          username: newUser.dataValues.username,
          email,
          userId: newUser.dataValues.id,
          token,
          exp,
        });
      }
    } catch (error) {
      console.log("ERROR IN register");
      console.log(error);
      res.sendStatus(400);
    }
  },

  login: async (req, res) => {
    try {
      const {email, password } = req.body;
      let foundUser = await User.findOne({ where: { email } });
      if (foundUser) {
        const isAuthenticated = bcrypt.compareSync(password, foundUser.password);

        if (isAuthenticated) {
          const token = createToken(
            foundUser.dataValues.email,
            foundUser.dataValues.id
          );
          const exp = Date.now() + 1000 * 60 * 60 * 48;
          res.status(200).send({
            email: foundUser.dataValues.email,
            userId: foundUser.dataValues.id,
            username: foundUser.dataValues.username,
            token,
            exp,
          });
        } else {
          res.status(400).send("cannot log in is authenticated");
        }
      } else {
        res.status(400).send("cannot log in in found user");
      }
    } catch (error) {
      console.log("ERROR IN register");
      console.log(error);
      res.sendStatus(400);
    }
  },
};
