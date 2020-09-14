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
    };
  }

  componentDidMount() {
    if (this.state.glassTypes === null) {
      axios.get('/v1/1/list.php?g=list').then((response) => {
        this.setState({
          glassTypes: [
            { strGlass: 'Any' },
            ...response.data.drinks.sort((a, b) =>
              a.strGlass > b.strGlass ? 1 : -1,
            ),
          ],
        });
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

  addIngredientOnClick = (event) => {
    event.preventDefault();
    console.log('[addIngredient]clicked');
    const newIngredient = event.target.previousSibling.lastChild.value;
    let newIngredients = [newIngredient, ...this.state.ingredients];
    this.setState({ ingredients: newIngredients });
    event.target.previousSibling.lastChild.value = '';
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

  enterIngredientsHandler = (event) => {
    event.preventDefault();
    const ingredients =
      '?i=' + this.state.ingredients.join(',').replace(' ', '_');
    const alcohol = this.state.alcohol ? '?a=Alcoholic' : '?a=Non_Alcoholic';
    const category =
      this.state.chosenCategory === 'Any'
        ? '?c='
        : '?c=' + this.state.chosenCategory.replace(' ', '_');
    const glassType =
      this.state.chosenGlassType === 'Any'
        ? '?g='
        : '?g=' + this.state.chosenGlassType.replace(' ', '_');
    this.props.history.push({
      pathname:
        this.props.match.url + '/drinkcardlist/' + 'filter.php/' + ingredients,
      search: '?' + alcohol + '&' + glassType + '&' + category,
    });
  };

  render() {
    let ingredientOptions = <option>Unknown</option>;
    if (this.state.ingredientOptions !== null) {
      ingredientOptions = this.state.ingredientOptions.map((ingredient) => {
        return <option key={ingredient}>{ingredient}</option>;
      });
    }

    return (
      <Aux>
        <form className={classes.IngredientSearch}>
          <div className={classes.AddIngredients}>
            <div>
              <Input
                label="Name an ingredient"
                placeholder="enter an ingredient"
              ></Input>
              <Button
                className={classes.SmallButton}
                click={this.addIngredientOnClick}
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
                  id="ynoes"
                  value="no"
                  checked={this.state.alcohol === false}
                />
              </div>
            </div>
          </div>

          <Button
            className={classes.Submit}
            click={this.enterIngredientsHandler}
          >
            what ya got?
          </Button>
        </form>
        <Divider className={classes.Divider} />
        <Route
          path={this.props.match.url + '/drinkcardlist/:param/:search'}
          component={DrinkCardList}
        />
        <div className={classes.Buffer}></div>
      </Aux>
    );
  }
}

export default ingredientSearch;
