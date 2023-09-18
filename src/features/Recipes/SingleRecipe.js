import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { getSingleRecipe } from "../../store/singleRecipeSlice";
import BackButton from "./BackButton";
import {
  addFavorite,
  getUserRecipes,
  removeFavorite,
} from "../../store/userRecipesSlice";
import Toastify from "toastify-js";

const SingleRecipe = (props) => {
  const userId = useSelector((state) => state.auth.me.id);
  const favorites = useSelector((state) => state.userRecipes.userRecipes);
  const dispatch = useDispatch();
  const { id } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const filter = queryParams.get("filter");
  const page = queryParams.get("page");

  useEffect(() => {
    if (id) {
      dispatch(getSingleRecipe(id));
    }
  }, [dispatch, id, userId]);

  const recipe = useSelector((state) => state.singleRecipe.singleRecipe);

  const handleAddFavorite = (recipeId, title, image) => {
    if (userId) {
      const recipeInFavorites = favorites.find(
        (fav) => fav.recipeId === recipeId
      );
      if (recipeInFavorites) {
        dispatch(removeFavorite({ userId, recipeId: id })).then(() =>
          dispatch(getUserRecipes(userId))
        );
      } else {
        if (recipe) {
          dispatch(
            addFavorite({
              userId,
              recipeId,
              title: recipe.title,
              image: recipe.image,
            })
          );
        }
      }
    } else {
      Toastify({
        text: "Please log in or register to save recipes to your favorites!",
        duration: 2000,
        close: true,
        gravity: "top",
        position: "center",
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
      }).showToast();
    }
  };

  const sanitizeHTML = (html) => {
    const strippedHTML = html?.replace(/<[^>]+>/g, ""); // Remove HTML tags
    return strippedHTML;
  };

  //The API sometimes mistakenly lists duplicate/triplicate ingredients.
  // This function makes sure they only get listed once.
  const filterUniqueIngredients = (ingredients) => {
    const uniqueIngredients = [];
    const seenIngredients = new Set();

    ingredients.forEach((ingredient) => {
      if (!seenIngredients.has(ingredient.original)) {
        uniqueIngredients.push(ingredient);
        seenIngredients.add(ingredient.original);
      }
    });

    return uniqueIngredients;
  };

  return (
    <div className="recipe-details">
      {recipe ? (
        <>
          <div className="single-recipe-container">
            <div className="recipe-header-container">
              <h2>{recipe.title} </h2>
              <button
                variant="outline"
                style={{
                  border: "none",
                  fontSize: "32px",
                }}
                onClick={() =>
                  handleAddFavorite(recipe.id, recipe.title, recipe.image)
                }
              >
                <span
                  className={`star-icon ${
                    favorites.some((fav) => fav.recipeId === recipe.id)
                      ? "active"
                      : ""
                  }`}
                >
                  {favorites.some((fav) => fav.recipeId === recipe.id)
                    ? "★"
                    : "☆"}
                </span>
              </button>
            </div>
            <img src={recipe.image} className="recipe-img" />
            <div className="instructions">
              <h3>Instructions:</h3>
              {sanitizeHTML(recipe.instructions)}
            </div>

            <div>
              <h3>Ingredients:</h3>
              <ul>
                {filterUniqueIngredients(recipe.extendedIngredients).map(
                  (ingredient) => (
                    <li key={ingredient.id}>{ingredient.original}</li>
                  )
                )}
              </ul>
            </div>
            <BackButton page={page} filter={filter} />
          </div>
        </>
      ) : (
        <p className="loading-text">Loading recipe...</p>
      )}
    </div>
  );
};

export default SingleRecipe;
