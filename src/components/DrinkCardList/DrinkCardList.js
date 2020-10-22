import React, { Component } from 'react';
import classes from './DrinkCardList.module.scss';
import DrinkCard from './DrinkCard/DrinkCard';
import Divider from '../../components/Divider/Divider';
import Aux from '../../hoc/Auxillary/Auxillary';
import Spinner from '../Spinner/Spinner';

class DrinkCardList extends Component {
  render() {
    let drinkCards = (
      <p className={classes.Error}>Please enter some ingredients</p>
    );
    if (this.props.loading === true) {
      drinkCards = <Spinner />;
    } else {
      if (this.props.drinks.length > 0) {
        drinkCards = this.props.drinks.map((drink) => {
          return (
            <DrinkCard
              src={drink.strDrinkThumb}
              id={drink.idDrink}
              key={drink.idDrink}
              title={drink.strDrink}
            />
          );
        });
      } else if (this.props.selectedIngredients.length > 0) {
        drinkCards = (
          <p className={classes.Error}>Sorry, I Can't Find Anything!</p>
        );
      }
    }

    return (
      <Aux>
        <div
          className={classes.DrinkCardList}
          data-test="component-drink-card-list"
        >
          {drinkCards}
        </div>
        <Divider className={classes.Divider} />
      </Aux>
    );
  }
}

export default DrinkCardList;
