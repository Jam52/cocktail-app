import React, { Component } from "react";
import classes from "./DrinkCardList.module.scss";
import axios from "../../axiosCocktail";
import DrinkCard from "./DrinkCard/DrinkCard";

class DrinkCardList extends Component {
    state = {
        searchItems: "",
        drinks: [],
    };

    componentDidMount() {
        if (
            this.state.searchItems !==
            this.props.location.search.replace(" ", "_")
        ) {
            this.fetchData();
        }
    }

    componentDidUpdate() {
        if (
            this.state.searchItems !==
            this.props.location.search.replace(" ", "_")
        ) {
            this.fetchData();
        }
    }

    fetchData() {
        console.log(
            this.props.match.params.param +
                this.props.location.search.replace(" ", "_")
        );
        axios
            .get(
                "/v2/9973533/" +
                    this.props.match.params.param +
                    this.props.location.search.replace(" ", "_")
            )
            .then((response) => {
                console.log(response.data.drinks);
                this.setState({ drinks: response.data.drinks });
                this.setState({
                    searchItems: this.props.location.search.replace(" ", "_"),
                });
            });
    }

    render() {
        let drinkCards = null;
        if (this.state.drinks.length > 0) {
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
        }
        return <div className={classes.DrinkCardList}>{drinkCards}</div>;
    }
}

export default DrinkCardList;
