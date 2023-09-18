import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { resetRecipes } from "../../store/allRecipesSlice";

const Recommended = () => {
  const recipes = useSelector((state) => state.recipes.recipes);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleReset = () => {
    dispatch(resetRecipes());
    navigate("/ingredients");
  };

  return (
    <>
      <div className="recommended-container">
        {recipes.length > 0 ? (
          <>
            <div className="all-recipes-container">
              {recipes.map((recipe) => (
                <div className="recipe-container" key={recipe.id}>
                  <NavLink to={`/allrecipes/${recipe.id}`}>
                    <p id="recipe-name">{recipe.title}</p>
                    <img
                      style={{ width: "200px" }}
                      src={recipe.image}
                      alt={recipe.name}
                    />
                  </NavLink>
                </div>
              ))}
            </div>

            <button className="back-to-search" onClick={handleReset}>
              Back to Search
            </button>
          </>
        ) : (
          <h1>Looking for delicious recipes...</h1>
        )}
      </div>
    </>
  );
};

export default Recommended;
