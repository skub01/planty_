const router = require("express").Router();
const UserRecipe = require("../db/models/UserRecipe");
const User = require("../db/models/User");
module.exports = router;

// get all favorites from a certain user
router.get("/:userId", async (req, res, next) => {
  try {
    const favorites = await UserRecipe.findAll({
      where: { userId: req.params.userId },
    });
    res.json(favorites);
  } catch (err) {
    next(err);
  }
});

router.post("/:userId/addFavorite", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { recipeId, title, image } = req.body;
    const favorite = await UserRecipe.create({
      userId: userId,
      recipeId: recipeId,
      title: title,
      image: image,
    });
    res.send(favorite);
  } catch (error) {
    next(error);
  }
});

router.delete("/:userId/removeFavorite/:recipeId", async (req, res, next) => {
  try {
    const { userId, recipeId } = req.params;
    await UserRecipe.destroy({ where: { userId, recipeId } });
    res.json({ message: "Favorite removed successfully", recipeId });
  } catch (error) {
    next(error);
  }
});
