const { DataTypes } = require("sequelize");

const { sequelize } = require("../util/db");

module.exports = {
  Comments: sequelize.define("comments", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    description: DataTypes.STRING,
   
  }),
};
