import axios from '../../axiosCocktail';

export const actionTypes = {
  SET_INGREDIENT_OPTIONS: 'SET_INGREDIENT_OPTIONS',
  SET_SELECTED_INGREDIENTS: 'SET_SELECTED_INGREDIENTS',
  REMOVE_SELECTED_INGREDIENTS: 'REMOVE_SELECTED_INGREDIENTS',
  SET_ALCOHOL_FILTER: 'SET_ALCOHOL_FILTER',
  ADD_RANDOM_DRINKS: 'ADD_RANDOM_DRINKS'
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

export const setAlcoholicDrinksOnlyFilter = (alcoholicDrinksOnly) => {
  return function (dispatch) {
    dispatch({
      type: actionTypes.SET_ALCOHOL_FILTER,
      payload: alcoholicDrinksOnly,
    });
  };
};


export const addRandomDrinks = () => {
  return function (dispatch) {
    return axios.get(`v2/${process.env.REACT_APP_COCKTAIL_KEY}/randomselection.php`).then(response => {
      dispatch({
        type: actionTypes.ADD_RANDOM_DRINKS,
        payload: response.data.drinks
      })
    })
  }
}
