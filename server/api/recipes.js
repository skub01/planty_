const router = require("express").Router();
const Ingredient = require("../db/models/Ingredient");
const Recipe = require("../db/models/Recipe");

module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const recipes = await Recipe.findAll({
      include: [Ingredient],
    });
    res.json(recipes);
  } catch (err) {
    console.log(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const recipe = await Recipe.findByPk(req.params.id, {
      include: [Ingredient],
    });
    res.json(recipe);
  } catch (error) {
    next(error);
  }
});
