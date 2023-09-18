import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllRecipes, selectRecipes } from "../../store/allRecipesSlice";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import PrevNext from "./PrevNext";

const AllRecipes = (props) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const intolerancesParam = queryParams.get("intolerances");
  const mealParam = queryParams.get("mealType");
  const [intolerances, setIntolerances] = useState(intolerancesParam || "");
  const [mealType, setMealType] = useState(mealParam || "");
  const totalEvents = useSelector((state) => state.recipes.totalResults);
  const totalPages = Math.ceil(totalEvents / 8);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pageParam = queryParams.get("page");
  const [page, setPage] = useState(pageParam ? parseInt(pageParam) : 1);

  useEffect(() => {
    dispatch(
      getAllRecipes({ intolerances: intolerances, type: mealType, page })
    );
  }, [dispatch, page]);

  useEffect(() => {
    const handleScroll = () => {
      sessionStorage.setItem("scrollPosition", window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const recipes = useSelector(selectRecipes);

  const handleFilter = () => {
    setPage(1);
    navigate(
      `/allrecipes/?intolerances=${intolerances}&mealType=${mealType}&page=1`
    );
    dispatch(
      getAllRecipes({ intolerances: intolerances, type: mealType, page: 1 })
    );
  };

  const handlePreviousPage = () => {
    const newPage = Math.max(page - 1, 1);
    setPage(newPage);
    navigate(
      `/allrecipes/?intolerances=${intolerances}&mealType=${mealType}&page=${newPage}`
    );
  };

  const handleNextPage = () => {
    const newPage = page + 1;
    setPage(newPage);
    navigate(
      `/allrecipes/?intolerances=${intolerances}&mealType=${mealType}&page=${newPage}`
    );
  };

  const handlePageClick = (pageNumber) => {
    setPage(pageNumber);
    navigate(
      `/allrecipes/?intolerances=${intolerances}&mealType=${mealType}&page=${pageNumber}`
    );
  };

  return (
    <>
      <div className="filter-container">
        <div>
          <label>Food Intolerance:</label>
          <select
            value={intolerances}
            onChange={(e) => setIntolerances(e.target.value)}
          >
            <option value="">None</option>
            <option value="Gluten">Gluten</option>
            <option value="Grain">Grain</option>
            <option value="Peanut">Peanut</option>
            <option value="Sesame">Sesame</option>
            <option value="Soy">Soy</option>
            <option value="Tree Nut">Tree Nut</option>
            <option value="Wheat">Wheat</option>
          </select>
        </div>
        <div>
          <label>Meal Type:</label>
          <select
            value={mealType}
            onChange={(e) => setMealType(e.target.value)}
          >
            <option value="">None</option>
            <option value="main course">Main Course</option>
            <option value="side dish">Side Dish</option>
            <option value="dessert">Dessert</option>
            <option value="appetizer">Appetizer</option>
            <option value="salad">Salad</option>
            <option value="breakfast">Breakfast</option>
            <option value="soup">Soup</option>
            <option value="snack">Snack</option>
            <option value="drink">Drink</option>
          </select>
        </div>
        <button onClick={handleFilter} className="filter-button">Filter</button>
      </div>
      <div className="recipes-and-buttons-container">
        <div className="all-recipes-container">
          {recipes ? (
            recipes.map((recipe) => (
              <div className="recipe-container" key={recipe.id}>
                <NavLink to={`/allrecipes/${recipe.id}`} className="recipe-link">
                  <p id="recipe-name">{recipe.title}</p>
                  <img
                    style={{ width: "200px" }}
                    src={recipe.image}
                    alt={recipe.name}
                  />
                </NavLink>
              </div>
            ))
          ) : (
            <p>Loading recipes...</p>
          )}
        </div>
        <PrevNext
          currentPage={page}
          totalPages={totalPages}
          totalEvents={totalEvents}
          onPageClick={handlePageClick}
          onNextClick={handleNextPage}
          onPreviousClick={handlePreviousPage}
        />
      </div>
    </>
  );
};

export default AllRecipes;
