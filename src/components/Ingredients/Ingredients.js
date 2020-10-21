import React from 'react';
import Ingredient from './Ingredient/Ingredient';
import classes from './Ingredients.module.scss';
import { connect } from 'react-redux';
import { removeSelectedIngredient } from '../../store/actions/index';

const Ingredients = (props) => {
  let ingredients = null;

  const removeIngredient = (evt) => {
    evt.preventDefault();
    console.log('CLICKED');
    props.removeSelectedIngredient(evt.target.value);
  };

  if (props.ingredients.selectedIngredients.length > 0) {
    ingredients = props.ingredients.selectedIngredients.map((ing, index) => {
      return (
        <Ingredient
          removeIngredient={(evt) => removeIngredient(evt)}
          key={index}
          data-test="single-ingredient"
        >
          {ing}
        </Ingredient>
      );
    });
  }
  return (
    <div
      className={classes.IngredientContainer}
      data-test="component-ingredients"
    >
      {ingredients}
    </div>
  );
};

const mapStateToProps = (state) => {
  const { ingredients } = state;
  return {
    ingredients,
  };
};

export default connect(mapStateToProps, { removeSelectedIngredient })(
  Ingredients,
);
