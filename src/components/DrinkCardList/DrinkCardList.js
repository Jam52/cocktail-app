import React, { Component } from 'react';
import classes from './DrinkCardList.module.scss';
import axios from '../../axiosCocktail';
import DrinkCard from './DrinkCard/DrinkCard';
import Divider from '../../components/Divider/Divider';
import Aux from '../../hoc/Auxillary/Auxillary';
import Spinner from '../Spinner/Spinner';
import { connect } from 'react-redux';
import ingredient from '../Ingredients/Ingredient/Ingredient';

class DrinkCardList extends Component {
  state = {
    componentParams: '',
    searchParams: this.searchParams(this.props.match.params.search),
    drinks: [],
    loading: true,
  };

  componentDidMount() {
    const componentParams =
      this.props.search + this.props.ingredients.selectedIngredients.join('');

    if (this.state.componentParams !== componentParams) {
      if (this.props.ingredients.selectedIngredients.length > 0) {
        this.fetchData(this.props.search).then((data) => {
          this.setState({
            drinks: data,
            loading: false,
            componentParams: componentParams,
          });
        });
      }
    }
  }

  componentDidUpdate() {
    const componentParams =
      this.props.search + this.props.ingredients.selectedIngredients.join('');
    if (this.state.componentParams !== componentParams) {
      if (this.props.ingredients.selectedIngredients.length > 0) {
        this.fetchData(this.props.match.params.search).then((data) => {
          this.setState({
            drinks: data,
            loading: false,
            componentParams: componentParams,
          });
        });
      }
    }
  }

  fetchIngredientData = async () => {
    const ingredientParams = `filter.php?i=${this.props.ingredients.selectedIngredients
      .join(',')
      .replace(' ', '_')}`;
    const getData = await axios.get(
      `/v2/${process.env.REACT_APP_COCKTAIL_KEY}/${ingredientParams}`,
    );
    return await getData.data.drinks;
  };

  // fetchParamData = async () => {
  //   let data = [];

  //   for (let param of this.loadSearchParams()) {
  //     const getParamData = await axios.get(
  //       `/v2/${process.env.REACT_APP_COCKTAIL_KEY}/${this.state.searchParams}`,
  //     );

  //     const paramResData = await getParamData.data.drinks;
  //     data.push(...paramResData);
  //     data = data.filter((obj) => typeof obj === 'object');
  //   }
  //   return data;
  // };

  fetchData = async (searchParam) => {
    let data;
    switch (searchParam) {
      case 'ingredientSearch':
        const ingredientData = await this.fetchIngredientData();
        data = await ingredientData;
        break;
      default:
        data = null;
    }

    // const paramData = await this.fetchParamData();

    return data;
  };

  searchParams(search) {
    switch (search) {
      case 'ingredientSearch':
        return `${this.props.ingredients.selectedIngredients.join('')}`;
      default:
        return `search.php?s=`;
    }
  }

  render() {
    let drinkCards = (
      <p className={classes.Error}>Please enter some ingredients</p>
    );
    if (this.props.ingredients.selectedIngredients.length > 0) {
      drinkCards = <Spinner />;
      if (this.state.loading === false) {
        if (
          this.state.drinks.length > 0 &&
          typeof this.state.drinks[0] === 'object'
        ) {
          drinkCards = this.state.drinks.map((drink) => {
            return (
              <DrinkCard
                src={drink.strDrinkThumb}
                id={drink.idDrink}
                key={drink.idDrink}
                title={drink.strDrink}
              />
            );
          });
        } else {
          drinkCards = (
            <p className={classes.Error}>Sorry, I Can't Find Anything!</p>
          );
        }
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

function duplicateEntriesOnly(dataArrayOne, dataArrayTwo) {
  const data = [...dataArrayOne, ...dataArrayTwo];
  if (dataArrayOne.length < 1 || dataArrayTwo.length < 1) {
    return data;
  }
  return data
    .sort((a, b) => (a.strDrink > b.strDrink ? 1 : -1))
    .filter((drink, index) => {
      if (data[index + 1] !== undefined) {
        return drink.strDrink === data[index + 1].strDrink;
      }
    });
}

const mapStateToProps = (state) => {
  const { ingredients } = state;
  return {
    ingredients,
  };
};

export { duplicateEntriesOnly };
export default connect(mapStateToProps)(DrinkCardList);
