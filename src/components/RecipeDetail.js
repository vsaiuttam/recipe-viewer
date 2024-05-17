import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './RecipeDetail.scss';

const RecipeDetail = ({ recipe, onToggleFavorite }) => {
  const detailRef = useRef();

  useEffect(() => {
    gsap.fromTo(detailRef.current, { opacity: 0 }, { opacity: 1, duration: 1 });
  }, [recipe]);

  return (
    <div className="recipe-detail" ref={detailRef}>
      <h2>{recipe.strMeal}</h2>
      <img src={recipe.strMealThumb} alt={recipe.strMeal} />
      <p>{recipe.strInstructions}</p>
      <button onClick={() => onToggleFavorite(recipe)} className="favorite-button">
        {recipe.isFavorite ? 'Unfavorite' : 'Favorite'}
      </button>
    </div>
  );
};

export default RecipeDetail;
