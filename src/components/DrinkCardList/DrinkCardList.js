import React, { Component } from 'react';
import classes from './DrinkCardList.module.scss';
import axios from '../../axiosCocktail';
import DrinkCard from './DrinkCard/DrinkCard';
import Divider from '../../components/Divider/Divider';
import Aux from '../../hoc/Auxillary/Auxillary';
import Spinner from '../Spinner/Spinner';

class DrinkCardList extends Component {
  state = {
    searchItems: '',
    drinks: [],
    loading: true,
  };

  componentDidMount() {
    console.log('[DrinkCardList]ComponentDidMount');
    console.log(this.props);
    if (
      this.state.searchItems !==
      this.props.match.params.search + this.loadSearchParams()
    ) {
      this.fetchData().then((data) => {
        this.setState({
          drinks: data,
          searchItems: this.props.match.params.search + this.loadSearchParams(),
          loading: false,
        });
      });
    }
  }

  componentDidUpdate() {
    console.log('[DrinkCardList]ComponentDidUpdate');
    if (
      this.state.searchItems !==
      this.props.match.params.search + this.loadSearchParams()
    ) {
      this.fetchData().then((data) => {
        this.setState({
          drinks: data,
          searchItems: this.props.match.params.search + this.loadSearchParams(),
          loading: false,
        });
      });
    }
  }

  fetchIngredientData = async () => {
    let mainSearchParam = this.props.match.params.search.replace(' ', '_');

    const getData = await axios.get(
      `/v2/${process.env.REACT_APP_COCKTAIL_KEY}/` +
        this.props.match.params.param +
        mainSearchParam,
    );

    return await getData.data.drinks;
  };

  fetchParamData = async () => {
    let data = [];

    for (let param of this.loadSearchParams()) {
      const getParamData = await axios.get(
        `/v2/${process.env.REACT_APP_COCKTAIL_KEY}/filter.php/` + param,
      );

      const paramResData = await getParamData.data.drinks;
      data.push(...paramResData);
      data = data.filter((obj) => typeof obj === 'object');
    }
    return data;
  };

  fetchData = async () => {
    const ingredientData = await this.fetchIngredientData();
    const paramData = await this.fetchParamData();

    return duplicateEntriesOnly(ingredientData, paramData);
  };

  loadSearchParams() {
    const query = new URLSearchParams(this.props.location.search);
    let newSearchParams = [];
    for (let param of query.entries()) {
      if (param[1]) {
        newSearchParams.push(param.join('='));
      }
    }
    return newSearchParams;
  }

  render() {
    let drinkCards = <Spinner />;

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

    return (
      <Aux>
        <div className={classes.DrinkCardList}>{drinkCards}</div>
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

export { duplicateEntriesOnly };
export default DrinkCardList;
