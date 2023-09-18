import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ingredientCategories } from './IngredientList'
import { getIngredientRecipes } from '../../store/allRecipesSlice';
import { redirect, useNavigate } from 'react-router-dom'; 
import Recommended from '../Recipes/Recommended';
import { resetRecipes } from '../../store/allRecipesSlice';


const Ingredients = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const initialCheckboxes = ingredientCategories.reduce((acc, { ingredients }) => {
    const ingredientsNames = ingredients.map((ingredient) => ingredient.name);
    return ingredientsNames.reduce((checkboxes, name) => {
      checkboxes[name] = false;
      return checkboxes;
    }, acc);
  }, {});

  const [selectedCourse, setSelectedCourse] = useState(""); 
  const [dietaryRestrictions, setDietaryRestrictions] = useState(""); 
  const [checkboxes, setCheckboxes] = useState(initialCheckboxes);
  const recipes = useSelector((state) => state.recipes.recipes);

  const handleCourseChange = (event) => {
    setSelectedCourse(event.target.value);
    const element = document.getElementById("dietaryRestrictions");
    element.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckboxes({ ...checkboxes, [name]: checked });
  };

  const handleFindRecipes = () => {
    const selectedIngredients = Object.entries(checkboxes)
      .filter(([name, checked]) => checked)
      .map(([name]) => name)
      .join(",");

    dispatch(getIngredientRecipes({selectedIngredients, type: selectedCourse, intolerances: dietaryRestrictions }));
    navigate('/recommended')
  };

  const handleDietaryRestrictionChange = (event) => {
    setDietaryRestrictions(event.target.value);
    const element = document.getElementById("section-container3");
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  };

 useEffect(() => {
    if (recipes.length > 0) {
      navigate('/recommended');
    }
  }, [recipes, navigate]); 

  return (
    <div className="ingredients-container">
    <div className="section-container" data-aos="zoom-in">
        <h1 id="mealtype">What kind of recipe are you looking for?</h1>
        <div id="mealtype">
        <label>
        <input
          type="radio"
          name="recipeType"
          value=""
          onChange={handleCourseChange}
        />
        Any
      </label>
        <label>
        <input
          type="radio"
          name="recipeType"
          value="breakfast"
          onChange={handleCourseChange}
        />
        Breakfast
      </label>
      <label>
        <input
          type="radio"
          name="recipeType"
          value="main course"
          onChange={handleCourseChange}
        />
        Main Course
      </label>
      <label>
        <input
          type="radio"
          name="recipeType"
          value="side dish"
          onChange={handleCourseChange}
        />
        Side Dish
      </label>
      <label>
        <input
          type="radio"
          name="recipeType"
          value="snack"
          onChange={handleCourseChange}
        />
        Snack
      </label>
      <label>
        <input
          type="radio"
          name="recipeType"
          value="dessert"
          onChange={handleCourseChange}
        />
        Dessert
      </label>
      <label>
        <input
          type="radio"
          name="recipeType"
          value="appetizer"
          onChange={handleCourseChange}
        />
        Appetizer
      </label>
      <label>
        <input
          type="radio"
          name="recipeType"
          value="salad"
          onChange={handleCourseChange}
        />
        Salad
      </label>
      </div>
      </div>
      <div className="section-container" data-aos="zoom-in">
      <h1 id="dietaryRestrictions">Any dietary restrictions or food intolerances?</h1>
      <div id="dietaryRestrictions">
      <label>
        <input
          type="radio"
          name="dietaryRestriction"
          value=""
          onChange={handleDietaryRestrictionChange}
        />
        None
      </label>
      <label>
        <input
          type="radio"
          name="dietaryRestriction"
          value="tree nuts"
          onChange={handleDietaryRestrictionChange}
        />
        Tree nuts
      </label>
      <label>
        <input
          type="radio"
          name="dietaryRestriction"
          value="Peanuts"
          onChange={handleDietaryRestrictionChange}
        />
        Peanuts
      </label>
      <label>
        <input
          type="radio"
          name="dietaryRestriction"
          value="Gluten"
          onChange={handleDietaryRestrictionChange}
        />
        Gluten
      </label>
      <label>
        <input
          type="radio"
          name="dietaryRestriction"
          value="sesame"
          onChange={handleDietaryRestrictionChange}
        />
        Sesame
      </label>
      <label>
        <input
          type="radio"
          name="dietaryRestriction"
          value="Soy"
          onChange={handleDietaryRestrictionChange}
        />
        Soy
      </label>
</div>
</div>
<div id="section-container3" className="section-container" data-aos="zoom-in">
        <h1 id="allIngredients">Choose a few main ingredients</h1>
        <div id="allIngredients">
        {ingredientCategories.map(({ category, ingredients }) => (
        <div key={category}>
          <h2 className="ingredient-category">{category}</h2>
          {ingredients.map((ingredient, index) => (
            <label key={index}>
              <input
                type="checkbox"
                name={ingredient.name}
                checked={checkboxes[ingredient.name] || false}
                onChange={handleCheckboxChange}
              />
              {ingredient.name}
            </label>
          ))}
        </div>
      ))}
      </div>
      <label key="surprise" style={{ textAlign: 'center', marginTop: '30px', marginBottom: '20px', fontSize: '28px' }}>
      <input
                type="checkbox"
                name=""
                checked={checkboxes[""] || false}
                onChange={handleCheckboxChange}
              />
              Or ... Surprise Me!
              </label>
      </div>
      <div className='find-container'>
      <button className="find-recipes" onClick={handleFindRecipes}>Find recipes</button>
  </div>
  </div>

);
};

export default Ingredients;
