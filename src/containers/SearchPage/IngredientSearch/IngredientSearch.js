import React, { Component } from 'react';
import axios from '../../../axiosCocktail';
import classes from './IngredientSearch.module.scss';
import Ingredients from '../../../components/Ingredients/Ingredients';
import Aux from '../../../hoc/Auxillary/Auxillary';
import Divider from '../../../components/Divider/Divider';
import DrinkCardList from '../../../components/DrinkCardList/DrinkCardList';
import Input from '../../../components/Input/Input';
import { checkEnteredIngredient } from './checkEnteredIngredient';
import {
  getIngredientOptions,
  addSelectedIngredient,
  setAlcoholicDrinksOnlyFilter,
} from '../../../store/actions/index';
import { connect } from 'react-redux';

export class UnconnectedIngredientSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alcohol: true,
      newIngredientError: false,
      ingredientInput: '',
      drinks: [],
      loading: false,
    };
  }

  componentDidMount() {
    if (this.props.ingredients.ingredientOptions.length === 0) {
      this.props.getIngredientOptions();
    }
    if (this.props.ingredients.selectedIngredients.length > 0) {
      this.updateDrinks();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.ingredients !== this.props.ingredients) {
      this.updateDrinks();
    }
  }

  updateDrinks = async () => {
    if (this.props.ingredients.selectedIngredients.length === 0) {
      this.setState({ drinks: [] });
    } else {
      this.setState({ loading: true });
      const drinks = this.duplicateEntriesOnly(
        await this.fetchIngredientData(),
        await this.fetchAlcoholData(),
      );
      this.setState({ drinks: await drinks, loading: false });
    }
  };

  fetchIngredientData = async () => {
    const ingredientData = await axios.get(
      `/v2/${
        process.env.REACT_APP_COCKTAIL_KEY
      }/filter.php?i=${this.props.ingredients.selectedIngredients
        .join(',')
        .replace(' ', '_')}`,
    );
    return await ingredientData.data.drinks;
  };

  fetchAlcoholData = async () => {
    const alcoholic = this.props.ingredients.alcoholicDrinksOnly
      ? 'Alcoholic'
      : 'Non_Alcoholic';
    const alcoholData = await axios.get(
      `/v2/${process.env.REACT_APP_COCKTAIL_KEY}/filter.php?a=${alcoholic}`,
    );
    return await alcoholData.data.drinks;
  };

  duplicateEntriesOnly = (ingredientData, alcoholData) => {
    const data = [...ingredientData, ...alcoholData];

    return data
      .sort((a, b) => (a.strDrink > b.strDrink ? 1 : -1))
      .filter((drink, index) => {
        if (data[index + 1] !== undefined) {
          return drink.strDrink === data[index + 1].strDrink;
        }
      });
  };

  addIngredientOnChange = (event) => {
    event.preventDefault();
    const newIngredient = event.target.value;
    this.props.addSelectedIngredient(newIngredient);
  };

  enterNewIngredientHandler = (event) => {
    event.preventDefault();
    const checkedIngredient = checkEnteredIngredient(
      this.state.ingredientInput,
      this.props.ingredients.ingredientOptions,
    );
    if (checkedIngredient) {
      this.props.addSelectedIngredient(checkedIngredient);
      this.setState({ ingredientInput: '' });
    } else {
      this.setState({ newIngredientError: true });
      this.setState({ ingredientInput: '' });
    }
  };

  inputChangeHandler = (event) => {
    this.setState({ ingredientInput: event.target.value });
    if (event.target.value.length > 0) {
      this.setState({ newIngredientError: false });
    }
  };

  toggleAlcohol = () => {
    this.props.setAlcoholicDrinksOnlyFilter(
      !this.props.ingredients.alcoholicDrinksOnly,
    );
  };

  render() {
    let ingredientOptions = <option>Unknown</option>;

    if (this.props.ingredients.ingredientOptions.length > 0) {
      ingredientOptions = this.props.ingredients.ingredientOptions
        .sort()
        .map((ingredient) => {
          return (
            <option value={ingredient} key={ingredient}>
              {ingredient}
            </option>
          );
        });
    }

    let inputPlaceholder = 'enter an ingredient';

    if (this.state.newIngredientError === true) {
      inputPlaceholder = 'we dont have that one!';
    }

    return (
      <Aux>
        <form className={classes.IngredientSearch}>
          <div className={classes.AddIngredients}>
            <div>
              <Input
                data-test="ingredients-input"
                id="ingredient-input"
                onChange={this.inputChangeHandler}
                value={this.state.ingredientInput}
                error={this.state.newIngredientError}
                label="Name an ingredient"
                placeholder={inputPlaceholder}
              ></Input>
              <button
                data-test="ingredients-submit"
                className={classes.Button}
                onClick={this.enterNewIngredientHandler}
              >
                add
              </button>
            </div>
            <div className={classes.Dropdown}>
              <label className={classes.Title}>Select an ingredient</label>
              <select
                data-test="dropdown-ingredients"
                onChange={this.addIngredientOnChange}
              >
                {ingredientOptions}
              </select>
            </div>

            <Ingredients />
          </div>

          <div className={classes.Alcohol}>
            <h2 className={classes.Title}>Alcohol?</h2>
            <div
              className={classes.CheckBox}
              onClick={this.toggleAlcohol}
              data-test="toggle-alcohol"
            >
              <div>
                <label for="yes">Yes Please!</label>
                <input
                  type="radio"
                  name="alcohol"
                  id="yes"
                  value="yes"
                  checked={this.props.ingredients.alcoholicDrinksOnly === true}
                />
              </div>
              <div>
                <label for="no">No Thanks.</label>
                <input
                  type="radio"
                  name="alcohol"
                  id="no"
                  value="no"
                  checked={this.props.ingredients.alcoholicDrinksOnly === false}
                />
              </div>
            </div>
          </div>
        </form>
        <Divider className={classes.Divider} />

        <DrinkCardList
          loading={this.state.loading}
          drinks={this.state.drinks}
          selectedIngredients={this.props.ingredients.selectedIngredients}
        />
        <div className={classes.Buffer}></div>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  const { ingredients } = state;
  return {
    ingredients,
  };
};

export default connect(mapStateToProps, {
  getIngredientOptions,
  addSelectedIngredient,
  setAlcoholicDrinksOnlyFilter,
})(UnconnectedIngredientSearch);
