import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import recipeReducer from './features/recipeSlice';
import App from './App';
import './index.css';

const store = configureStore({
  reducer: {
    recipes: recipeReducer,
  },
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

