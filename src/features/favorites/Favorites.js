import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getFavoriteRecipes } from "../../store/favoritesSlice";
import { getUserRecipes } from "../../store/userRecipesSlice";

const Favorites = ( { user } ) => {
  const [userId, setUserId] = useState(null);
  const favorites = useSelector((state) => state.userRecipes.userRecipes);
  const dispatch = useDispatch();


  return (
    <div className="favorites-container">
      <h3>Welcome to your favorites page, {user.username}!</h3>
      {favorites.length ? (
        <>
          <h4>Saved Recipes:</h4>
          <ul className="favorite-list">
            {favorites.map((favorite) => (
              <li key={favorite.id}>
                <img src={favorite.image} className="favorite-recipe-img" />
                <Link to={`/allrecipes/${favorite.recipeId}`}>
                  {favorite.title}
                </Link>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>No favorites yet!</p>
      )}
    </div>
  );
};

export default Favorites;
