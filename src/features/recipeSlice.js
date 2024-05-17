import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  recipes: [],
  selectedRecipe: null,
  status: 'idle',
  error: null,
  favorites: [],
};

export const fetchRecipesByLetter = createAsyncThunk(
  'recipes/fetchRecipesByLetter',
  async (letter) => {
    const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
    return response.data.meals;
  }
);

export const fetchRecipesByName = createAsyncThunk(
  'recipes/fetchRecipesByName',
  async (name) => {
    const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
    return response.data.meals;
  }
);

export const fetchRandomRecipe = createAsyncThunk(
  'recipes/fetchRandomRecipe',
  async () => {
    const response = await axios.get('https://www.themealdb.com/api/json/v1/1/random.php');
    return response.data.meals[0];
  }
);

const recipeSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    selectRecipe(state, action) {
      state.selectedRecipe = action.payload;
    },
    reorderRecipes(state, action) {
      const [removed] = state.recipes.splice(action.payload.sourceIndex, 1);
      state.recipes.splice(action.payload.destinationIndex, 0, removed);
    },
    toggleFavorite(state, action) {
      const recipe = action.payload;
      const existingIndex = state.favorites.findIndex((fav) => fav.idMeal === recipe.idMeal);
      if (existingIndex >= 0) {
        state.favorites.splice(existingIndex, 1);
      } else {
        state.favorites.push(recipe);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipesByLetter.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRecipesByLetter.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.recipes = action.payload;
      })
      .addCase(fetchRecipesByLetter.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchRecipesByName.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRecipesByName.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.recipes = action.payload;
      })
      .addCase(fetchRecipesByName.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchRandomRecipe.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRandomRecipe.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.recipes = [action.payload, ...state.recipes];
      })
      .addCase(fetchRandomRecipe.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { selectRecipe, reorderRecipes, toggleFavorite } = recipeSlice.actions;

export default recipeSlice.reducer;
