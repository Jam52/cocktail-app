import React, { Component } from 'react';
import classes from './DrinkCardList.module.scss';
import DrinkCard from './DrinkCard/DrinkCard';
import Divider from '../../components/Divider/Divider';
import Aux from '../../hoc/Auxillary/Auxillary';
import Spinner from '../Spinner/Spinner';

class DrinkCardList extends Component {
  render() {
    let drinkCards = <p className={classes.Error}>{this.props.message}</p>;
    if (this.props.loading === true) {
      drinkCards = <Spinner />;
    } else {
      if (this.props.drinks !== undefined) {
        if (this.props.drinks.length > 0) {
          drinkCards = (
            <div
              className={classes.DrinkCardList}
              data-test="component-drink-card-list"
            >
              {this.props.drinks.map((drink) => {
                return (
                  <DrinkCard
                    src={drink.strDrinkThumb}
                    id={drink.idDrink}
                    key={drink.idDrink}
                    title={drink.strDrink}
                  />
                );
              })}
            </div>
          );
        } else if (this.props.noDrinksFound) {
          drinkCards = (
            <p className={classes.Error}>Sorry, I Can't Find Anything!</p>
          );
        }
      }
    }

    return (
      <Aux>
        <div className={classes.container}>{drinkCards}</div>
        <Divider className={classes.divider} />
      </Aux>
    );
  }
}

export default DrinkCardList;
