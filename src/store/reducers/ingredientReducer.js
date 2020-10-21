import ingredient from '../../components/Ingredients/Ingredient/Ingredient';
import { actionTypes } from '../actions/index';

const initialState = {
  ingredientOptions: [],
  selectedIngredients: [],
  alcoholicDrinksOnly: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_INGREDIENT_OPTIONS:
      return { ...state, ingredientOptions: action.payload };
    case actionTypes.SET_SELECTED_INGREDIENTS:
      return {
        ...state,
        selectedIngredients: [...state.selectedIngredients, action.payload],
      };
    case actionTypes.REMOVE_SELECTED_INGREDIENTS:
      const newSelectedIngredients = [...state.selectedIngredients].filter(
        (ingredient) => ingredient !== action.payload,
      );
      return {
        ...state,
        selectedIngredients: newSelectedIngredients,
      };
    case actionTypes.SET_ALCOHOL_FILTER:
      return {
        ...state,
        alcoholicDrinksOnly: action.payload,
      };

    default:
      return state;
  }
};
