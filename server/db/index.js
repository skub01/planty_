const db = require('./db');
const User = require('./models/User');
const Recipe = require('./models/Recipe');
const UserRecipe = require('./models/UserRecipe');
const Ingredient = require('./models/Ingredient');
const RecipeIngredient = require('./models/RecipeIngredient');

/* Recipe.belongsToMany(Ingredient, { through: RecipeIngredient });
Ingredient.belongsToMany(Recipe, { through: RecipeIngredient });

User.belongsToMany(Recipe, { through: UserRecipe });
Recipe.belongsToMany(User, { through: UserRecipe });
 */
module.exports = {
  db,
  models: {
    User,
    Recipe,
    UserRecipe,
    Ingredient,
    RecipeIngredient
  },
}
