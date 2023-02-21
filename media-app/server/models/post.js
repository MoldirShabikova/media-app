const { DataTypes } = require("sequelize");

const { sequelize } = require("../util/db");

module.exports = {
  Post: sequelize.define("post", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    title: DataTypes.STRING,
    image: DataTypes.TEXT,
    privateStatus: DataTypes.BOOLEAN,
    createAt: DataTypes.DATE,
    description: DataTypes.STRING,
  }),
};
