import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Button from '../../../components/Button/Button';
import classes from './IngredientSearch.module.scss';
import axios from '../../../axiosCocktail';
import Ingredients from '../../../components/Ingredients/Ingredients';
import Aux from '../../../hoc/Auxillary/Auxillary';
import Divider from '../../../components/Divider/Divider';
import DrinkCardList from '../../../components/DrinkCardList/DrinkCardList';
import Input from '../../../components/Input/Input';
import { checkEnteredIngredient } from './checkEnteredIngredient';

class ingredientSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      glassTypes: null,
      categories: null,
      ingredientOptions: null,
      ingredients: [],
      alcohol: true,
      chosenGlassType: 'Any',
      chosenCategory: 'Any',
      newIngredientError: false,
    };
  }

  componentDidMount() {
    if (this.props.history.action === 'POP') {
      this.props.history.push({
        pathname:
          this.props.history.location.pathname +
          this.props.history.location.search,
      });
    }

    if (this.state.ingredientOptions === null) {
      axios.get('/v1/1/list.php?i=list').then((response) => {
        this.setState({
          ingredientOptions: [
            ...response.data.drinks
              .sort((a, b) => (a.strIngredient1 > b.strIngredient1 ? 1 : -1))
              .map((ingredient) => {
                return ingredient.strIngredient1;
              }),
          ],
        });
      });
    }
  }

  addIngredientOnChange = (event) => {
    event.preventDefault();
    console.log('[addIngredient]clicked');
    const newIngredient = event.target.value;
    let newIngredients = [newIngredient, ...this.state.ingredients];
    this.setState({ ingredients: newIngredients });
    event.target.previousSibling.lastChild.value = '';
  };

  enterNewIngredientHandler = (event) => {
    event.preventDefault();
    console.log('[enterNewIngredientHandler]clicked');
    const newIngredient = checkEnteredIngredient(
      event.target.previousSibling.lastChild.value,
      this.state.ingredientOptions,
    );

    if (newIngredient) {
      let newIngredients = [newIngredient, ...this.state.ingredients];
      this.setState({ ingredients: newIngredients });
      event.target.previousSibling.lastChild.value = '';
      this.setState({ newIngredientError: false });
    } else {
      event.target.previousSibling.lastChild.value = '';
      this.setState({ newIngredientError: true });
    }
  };

  inputChangeHandler = (event) => {
    if (event.target.value.length > 0) {
      this.setState({ newIngredientError: false });
    }
  };

  removeIngredient = (event) => {
    event.preventDefault();
    console.log('[removeIngredient]clicked');
    console.log(event.target);
    let ingredientRemoved = this.state.ingredients.filter((ing) => {
      return ing !== event.target.value;
    });
    this.setState({ ingredients: ingredientRemoved });
  };

  toggleAlcohol = () => {
    this.setState({ alcohol: !this.state.alcohol });
  };

  submitSearchHandler = (event) => {
    event.preventDefault();
    console.log('{submitHandler}fired' + event);
    const ingredients =
      '?i=' + this.state.ingredients.join(',').replace(' ', '_');
    const alcohol = this.state.alcohol ? '?a=Alcoholic' : '?a=Non_Alcoholic';
    this.props.history.push({
      pathname:
        this.props.match.url +
        '/drinkcardlist/' +
        'filter.php/' +
        ingredients +
        '/' +
        alcohol,
    });
  };

  render() {
    let ingredientOptions = <option>Unknown</option>;
    if (this.state.ingredientOptions !== null) {
      ingredientOptions = this.state.ingredientOptions.map((ingredient) => {
        return <option key={ingredient}>{ingredient}</option>;
      });
    }

    let ingredientInput = (
      <Input
        id="ingredient input"
        label="Name an ingredient"
        placeholder="enter an ingredient"
      ></Input>
    );

    if (this.state.newIngredientError === true) {
      ingredientInput = (
        <Input
          id="ingredient input"
          onChange={this.inputChangeHandler}
          error
          label="Name an ingredient"
          placeholder="we dont have that one!"
        ></Input>
      );
    }

    return (
      <Aux>
        <form className={classes.IngredientSearch}>
          <div className={classes.AddIngredients}>
            <div>
              {ingredientInput}
              <Button
                className={classes.SmallButton}
                click={this.enterNewIngredientHandler}
              >
                add
              </Button>
            </div>
            <div className={classes.Dropdown}>
              <label className={classes.Title}>Select an ingredient</label>
              <select onChange={this.addIngredientOnChange}>
                {ingredientOptions}
              </select>
            </div>

            <Ingredients
              removeIngredient={this.removeIngredient}
              ingredients={this.state.ingredients}
            />
          </div>

          <div className={classes.Alcohol}>
            <h2 className={classes.Title}>Alcohol?</h2>
            <div className={classes.CheckBox} onClick={this.toggleAlcohol}>
              <div>
                <label for="yes">Yes Please!</label>
                <input
                  type="radio"
                  name="alcohol"
                  id="yes"
                  value="yes"
                  checked={this.state.alcohol === true}
                />
              </div>
              <div>
                <label for="no">No Thanks.</label>
                <input
                  type="radio"
                  name="alcohol"
                  id="no"
                  value="no"
                  checked={this.state.alcohol === false}
                />
              </div>
            </div>
          </div>

          <Button className={classes.Submit} click={this.submitSearchHandler}>
            what ya got?
          </Button>
        </form>
        <Divider className={classes.Divider} />

        <Route
          path={this.props.match.path + '/drinkcardlist/:param/:search'}
          component={DrinkCardList}
        />
        <div className={classes.Buffer}></div>
      </Aux>
    );
  }
}

export default ingredientSearch;
