import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipesByLetter, fetchRecipesByName, fetchRandomRecipe, selectRecipe, reorderRecipes, toggleFavorite } from './features/recipeSlice';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';
import './App.scss';

function App() {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes.recipes);
  const selectedRecipe = useSelector((state) => state.recipes.selectedRecipe);
  const status = useSelector((state) => state.recipes.status);
  const error = useSelector((state) => state.recipes.error);
  const favorites = useSelector((state) => state.recipes.favorites);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchRecipesByLetter('a'));
  }, [dispatch]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = () => {
    dispatch(fetchRecipesByName(searchTerm));
  };

  const handleRandomRecipe = () => {
    dispatch(fetchRandomRecipe());
  };

  const handleReorderRecipes = (sourceIndex, destinationIndex) => {
    dispatch(reorderRecipes({ sourceIndex, destinationIndex }));
  };

  const handleToggleFavorite = (recipe) => {
    dispatch(toggleFavorite(recipe));
  };

  return (
    <div className="app">
      <div className="search-bar">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search for a recipe..."
        />
        <button onClick={handleSearchSubmit}>Search</button>
        <button onClick={handleRandomRecipe}>Random Recipe</button>
      </div>
      <div className="main-content">
        <div className="recipe-list-section">
          <h3>Favorites</h3>
          <RecipeList recipes={favorites} onSelectRecipe={recipe => dispatch(selectRecipe(recipe))} onReorderRecipes={handleReorderRecipes} />
          <h3>All Recipes</h3>
          {status === 'loading' && <div>Loading...</div>}
          {error && <div>Error: {error}</div>}
          <RecipeList recipes={recipes} onSelectRecipe={recipe => dispatch(selectRecipe(recipe))} onReorderRecipes={handleReorderRecipes} />
        </div>
        <div className="recipe-detail-section">
          {selectedRecipe && <RecipeDetail recipe={selectedRecipe} onToggleFavorite={handleToggleFavorite} />}
        </div>
      </div>
    </div>
  );
}

export default App;

