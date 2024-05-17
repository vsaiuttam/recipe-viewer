import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './RecipeList.scss';

const RecipeList = ({ recipes, onSelectRecipe, onReorderRecipes }) => {
  const listRef = useRef();

  useEffect(() => {
    gsap.fromTo(
      listRef.current.children,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.5 }
    );
  }, [recipes]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    onReorderRecipes(result.source.index, result.destination.index);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="recipes">
        {(provided) => (
          <ul className="recipe-list" {...provided.droppableProps} ref={listRef}>
            {recipes.map((recipe, index) => (
              <Draggable key={recipe.idMeal} draggableId={recipe.idMeal} index={index}>
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    onClick={() => onSelectRecipe(recipe)}
                  >
                    {recipe.strMeal}
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default RecipeList;
