const Sequelize = require("sequelize");
const db = require("../db");

const UserRecipe = db.define("userRecipe", {
    userId: {
        type: Sequelize.INTEGER,
      },
      recipeId: {
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
      },
      image: {
        type: Sequelize.STRING,
      },
});

module.exports = UserRecipe;  