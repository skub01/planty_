import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getFavoriteRecipes = createAsyncThunk(
  "favoriteRecipes/getFavoriteRecipes",
  async (recipeIds) => {
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/informationBulk`,
        {
          params: {
            apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
            ids: recipeIds.join(","),
          },
        }
      );
      return response.data;
    } catch (err) {
      return console.log(err.response.data);
    }
  }
);

const favoritesSlice = createSlice({
  name: "favoriteRecipes",
  initialState: {
    favoriteRecipes: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFavoriteRecipes.fulfilled, (state, { payload }) => {
      state.favoriteRecipes.push(...payload);
    });
  },
});

export const selectFavoriteRecipes = (state) => {
  return state.favorites.favoriteRecipes;
};

export default favoritesSlice.reducer;
