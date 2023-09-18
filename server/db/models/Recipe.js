const Sequelize = require("sequelize");
const db = require("../db");

const Recipe = db.define("recipe", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  image: {
    type: Sequelize.TEXT,
    defaultValue: "defaultProduct.png",
  },
  instructions: Sequelize.TEXT,
  category: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  servingSize: {
    type: Sequelize.INTEGER,
    validate: {
      notEmpty: true,
      min: 1,
    },
  },
  allergyInfo: Sequelize.STRING
});

module.exports = Recipe;
