import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// this returns all favorites for a certain user (just the recipe ID numbers)
export const getUserRecipes = createAsyncThunk("getFavs", async (id) => {
  try {
    const { data } = await axios.get(`/api/userrecipes/${id}`);
    return data;
  } catch (err) {
    console.log(err);
  }
});

export const addFavorite = createAsyncThunk(
  "addFav",
  async ({ userId, recipeId, title, image }) => {
    try {
      const { data } = await axios.post(
        `/api/userrecipes/${userId}/addFavorite`,
        { recipeId, title, image }
      );
      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
);

export const removeFavorite = createAsyncThunk(
  "removeFav",
  async ({ userId, recipeId }) => {
    try {
      const { data } = await axios.delete(
        `/api/userrecipes/${userId}/removeFavorite/${recipeId}`
      );
      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
);

const userRecipesSlice = createSlice({
  name: "userRecipes",
  initialState: {
    userRecipes: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserRecipes.fulfilled, (state, { payload }) => {
        state.userRecipes = payload;
      })
      .addCase(addFavorite.fulfilled, (state, { payload }) => {
        state.userRecipes.push(payload);
      })
      .addCase(removeFavorite.fulfilled, (state, { payload }) => {
        state.userRecipes = state.userRecipes.filter(
          (recipe) => recipe.recipeId !== payload.recipeId
        );
      });
  },
});

export const selectUserRecipes = (state) => {
  return state.userRecipes.userRecipes;
};

export default userRecipesSlice.reducer;
