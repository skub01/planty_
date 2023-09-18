const Sequelize = require("sequelize");
const db = require("../db");

const RecipeIngredient = db.define('recipeIngredient', {
    recipeId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      ingredientId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
    amount: {
      type: Sequelize.STRING, 
      allowNull: false,
    },
  });

module.exports = RecipeIngredient;
