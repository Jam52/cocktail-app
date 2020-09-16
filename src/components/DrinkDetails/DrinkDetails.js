import React, { Component } from 'react';
import axios from '../../axiosCocktail';
import classes from './DrinkDetails.module.scss';
import Aux from '../../hoc/Auxillary/Auxillary';

class DrinkDetails extends Component {
  state = {
    ingredients: [],
    strInstructions: '',
    strGlass: '',
    strDrink: '',
    idDrink: '',
    strDrinkThumb: '',
  };

  componentDidMount() {
    console.log('[componentDidMount]', this.props.match.params.id);
    if (!this.state.idDrink.length > 0) {
      this.setState({ idDrink: this.props.match.params.id });
      this.fetchDrinkData();
    }
  }

  fetchDrinkData = async () => {
    let data = await axios.get(
      '/v1/1/lookup.php?i=' + this.props.match.params.id,
    );
    console.log('[fetchDrinkData]', data.data.drinks[0]);
    data = data.data.drinks[0];

    let ingredients = [];
    for (let i = 1; i <= 15; i++) {
      if (
        data[`strIngredient${i}`] !== null &&
        data[`strIngredient${i}`] !== ''
      ) {
        ingredients.push({
          measure: data[`strMeasure${i}`],
          ingredient: data[`strIngredient${i}`],
        });
      }
    }

    this.setState({
      ingredients: ingredients,
      strInstructions: data.strInstructions,
      strDrink: data.strDrink,
      strGlass: data.strGlass,
      strDrinkThumb: data.strDrinkThumb,
    });
    console.log(this.state);
  };

  render() {
    let drinkDetails = <h2 id="loading">Loading, one sec!</h2>;
    if (this.state.ingredients.length > 0) {
      let ingredientList = this.state.ingredients.map((ing) => {
        return (
          <li id="ingredients">
            <p className={classes.ListItem}>
              <strong>{`${ing.measure}`}</strong>
              {` - ${ing.ingredient}`}
            </p>
          </li>
        );
      });

      drinkDetails = (
        <Aux>
          <h2 className={classes.Title}>{this.state.strDrink}</h2>
          <img
            className={classes.Image}
            src={this.state.strDrinkThumb}
            alt={this.state.strDrink}
          />
          <div className={classes.Instructions}>
            <h3 className={classes.SubTitle}>Instructions</h3>
            <p>{this.state.strInstructions}</p>
          </div>
          <div className={classes.Ingredients}>
            <h3 className={classes.SubTitle}>Ingredients</h3>
            <ul className={classes.IngredientsContainer}>{ingredientList}</ul>
          </div>
        </Aux>
      );
    }
    return (
      <Aux>
        <div className={classes.DrinkDetails}>{drinkDetails}</div>;
      </Aux>
    );
  }
}

export default DrinkDetails;
