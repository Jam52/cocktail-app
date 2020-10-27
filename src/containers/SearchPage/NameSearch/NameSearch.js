import React, { Component } from 'react';
import Button from '../../../components/Button/Button';
import classes from './NameSearch.module.scss';
import Input from '../../../components/Input/Input';
import Aux from '../../../hoc/Auxillary/Auxillary';
import Divider from '../../../components/Divider/Divider';
import DrinkCardList from '../../../components/DrinkCardList/DrinkCardList';
import axios from '../../../axiosCocktail';

class nameSearch extends Component {
 state = {
  loading: false,
  drinks: [],
  noDrinksFound: false,
  drinkNameInput: ''
 }


  onSubmitDrinkNameHandler = async (event) => {
    event.preventDefault();
    this.setState({loading: true});
    const drinks = await this.fetchDrinkData(this.state.drinkNameInput)
    this.setState({drinks: await drinks, loading: false})
  };

  fetchDrinkData = async (drinkName) => {
    const drinkData = await axios.get(`/v2/${process.env.REACT_APP_COCKTAIL_KEY}/search.php?s=${drinkName.replace(' ', '_')}`);
    return  drinkData.data.drinks;
  }

  onInputChangeHandler(event)  {
    event.preventDefault();
    this.setState({drinkNameInput: event.target.value})
  }

  render() {
    return (
      <Aux data-test="component-name-search">
        <form className={classes.DrinkSearch}>
          <Input
            data-test="drink-name-input"
            label="Name your poison"
            type="text"
            placeholder="enter a drink name"
            name="drink name"
            value={this.state.drinkNameInput}
            onChange={(event) => this.onInputChangeHandler(event)}
          />

          <button data-test="submit-button" className={classes.Button} onClick={(event) => this.onSubmitDrinkNameHandler(event)}>What ya got?</button>
        </form>
        <Divider />
        <DrinkCardList
          data-test="drink-card-list"
          loading={this.state.loading}
          drinks={this.state.drinks}
          message="What can I get ya?"
          noDrinksFound={this.state.noDrinksFound}
        />
        <div className={classes.Buffer}></div>
      </Aux>
    );
  }
}

export default nameSearch;
