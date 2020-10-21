import axios from '../../axiosCocktail';
import ingredient from '../../components/Ingredients/Ingredient/Ingredient';

export const actionTypes = {
  SET_INGREDIENT_OPTIONS: 'SET_INGREDIENT_OPTIONS',
  SET_SELECTED_INGREDIENTS: 'SET_SELECTED_INGREDIENTS',
  REMOVE_SELECTED_INGREDIENTS: 'REMOVE_SELECTED_INGREDIENTS',
};

export const getIngredientOptions = () => {
  return (dispatch) => {
    return axios.get('v1/1/list.php?i=list').then((response) => {
      dispatch({
        type: actionTypes.SET_INGREDIENT_OPTIONS,
        payload: response.data.drinks.map((obj) => {
          return obj.strIngredient1;
        }),
      });
    });
  };
};

export const addSelectedIngredient = (newIngredient) => {
  return function (dispatch) {
    dispatch({
      type: actionTypes.SET_SELECTED_INGREDIENTS,
      payload: newIngredient,
    });
  };
};

export const removeSelectedIngredient = (ingredient) => {
  return function (dispatch) {
    dispatch({
      type: actionTypes.REMOVE_SELECTED_INGREDIENTS,
      payload: ingredient,
    });
  };
};
