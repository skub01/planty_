import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

export const handleFavoriteAsync = createAsyncThunk(
  "events/handleEventAsync",
  async (recipe) => {
    const userDocRef = doc(db, "users", auth.currentUser.uid);

    try {
      const userDocSnapshot = await getDoc(userDocRef);
      const userRecipes = userDocSnapshot.data()?.userRecipes || [];
      let updatedRecipes;

      const existingRecipe = userRecipes.find((r) => r.id === recipe.id);

   if (existingRecipe) {
        updatedRecipes = userRecipes.filter((r) => r.id !== recipe.id);
      } else {
        updatedRecipes = [...userRecipes, recipe];
      }

      await updateDoc(userDocRef, {
        userRecipes: updatedRecipes,
      });

      return updatedRecipes;
    } catch (error) {
      console.error("Error updating user events:", error);
      throw error;
    }
  }
);

const userRecipesSlice = createSlice({
  name: "userRecipes",
  initialState: {
    userRecipes: [],
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(handleFavoriteAsync.fulfilled, (state, action) => {
      state.userRecipes = action.payload; 
    });
  },
});

export const selectUserRecipes = (state) => {
  return state.userRecipes.userRecipes;
};

export default userRecipesSlice.reducer;
