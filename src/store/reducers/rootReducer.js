import { combineReducers } from 'redux';

import ingredients from './ingredientReducer';
import randomDrinks from './randomDrinksReducer';

export default combineReducers({
  ingredients,
  randomDrinks
});
