import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";

import Home from "./features/home/Home";
import { auth, db } from "./firebase";
import Favorites from "./features/favorites/Favorites";
import Ingredients from "./features/ingredients/Ingredients";
import AllRecipes from "./features/Recipes/AllRecipes";
import SingleRecipe from "./features/Recipes/SingleRecipe";
import { getUserRecipes } from "./store/userRecipesSlice";
import Recommended from "./features/Recipes/Recommended";
import Login from "./features/auth/Login";
import Signup from "./features/auth/Signup";

const AppRoutes = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUserLoggedIn(!!user);
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (auth.currentUser.uid) {
      dispatch(getUserRecipes(auth.currentUser.uid));
    }
  }, [dispatch]);

  return (
    <div>
      {userLoggedIn ? (
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/ingredients" element={<Ingredients />} />
          <Route path="/recommended" element={<Recommended />} />
          <Route path="/allrecipes" element={<AllRecipes />} />
          <Route path="/allrecipes/:id" element={<SingleRecipe />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="/allrecipes" element={<AllRecipes />} />
          <Route path="/allrecipes/:id" element={<SingleRecipe />} />
          <Route path="/ingredients" element={<Ingredients />} />
          <Route path="/recommended" element={<Recommended />} />
          <Route
            path="/login"
            element={<Login name="login" displayName="Login" />}
          />
          <Route
            path="/signup"
            element={<Signup name="signup" displayName="Sign Up" />}
          />
        </Routes>
      )}
    </div>
  );
};

export default AppRoutes;
