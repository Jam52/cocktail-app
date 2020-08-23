import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import Button from "../../Button/Button";
import Input from "../../Input/Input";
import classes from "./IngredientSearch.module.scss";
import axios from "../../../axiosCocktail";
import Ingredients from "../../../components/Ingredients/Ingredients";
import Aux from "../../../hoc/Auxillary/Auxillary";
import Divider from "../../Divider/Divider";
import DrinkCardList from "../../DrinkCardList/DrinkCardList";

class ingredientSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            glassTypes: null,
            categories: null,
            ingredientOptions: null,
            ingredients: [],
            alcohol: true,
            chosenGlassType: "Any",
            chosenCategory: "Any",
        };
    }

    componentDidMount() {
        if (this.state.glassTypes === null) {
            axios.get("/v1/1/list.php?g=list").then((response) => {
                this.setState({
                    glassTypes: [
                        { strGlass: "Any" },
                        ...response.data.drinks.sort((a, b) =>
                            a.strGlass > b.strGlass ? 1 : -1
                        ),
                    ],
                });
            });
        }
        if (this.state.categories === null) {
            axios.get("/v1/1/list.php?c=list").then((response) => {
                this.setState({
                    categories: [
                        { strCategory: "Any" },
                        ...response.data.drinks.sort((a, b) =>
                            a.strCategory > b.strCategory ? 1 : -1
                        ),
                    ],
                });
            });
        }
        if (this.state.ingredientOptions === null) {
            axios.get("/v1/1/list.php?i=list").then((response) => {
                this.setState({
                    ingredientOptions: [
                        ...response.data.drinks.sort((a, b) =>
                            a.strIngredient1 > b.strIngredient1 ? 1 : -1
                        ),
                    ],
                });
            });
        }
    }

    addIngredient = (event) => {
        event.preventDefault();
        console.log("[addIngredient]clicked");
        const newIngredient = event.target.previousSibling.lastChild.value;
        let newIngredients = [newIngredient, ...this.state.ingredients];
        this.setState({ ingredients: newIngredients });
        event.target.previousSibling.lastChild.value = "";
    };

    removeIngredient = (event) => {
        event.preventDefault();
        console.log("[removeIngredient]clicked");
        console.log(event.target);
        let ingredientRemoved = this.state.ingredients.filter((ing) => {
            return ing !== event.target.value;
        });
        this.setState({ ingredients: ingredientRemoved });
    };

    toggleAlcohol = () => {
        this.setState({ alcohol: !this.state.alcohol });
    };

    glassSelect = (event) => {
        this.setState({ chosenGlassType: event.target.value });
    };
    categorySelect = (event) => {
        this.setState({ chosenCategory: event.target.value });
    };

    enterIngredientsHandler = (event) => {
        event.preventDefault();
        const ingredients =
            "?i=" + this.state.ingredients.join(",").replace(" ", "_");
        const alcohol = this.state.alcohol
            ? "?a=Alcoholic"
            : "?a=Non_Alcoholic";
        const category =
            this.state.chosenCategory === "Any"
                ? "?c="
                : "?c=" + this.state.chosenCategory.replace(" ", "_");
        const glassType =
            this.state.chosenGlassType === "Any"
                ? "?g="
                : "?g=" + this.state.chosenGlassType.replace(" ", "_");
        this.props.history.push({
            pathname:
                this.props.match.url +
                "/drinkcardlist/" +
                "filter.php/" +
                ingredients,
            search: "?" + glassType + "&" + category + "&" + alcohol,
        });
    };

    render() {
        let glassOptions = <option>Unknown</option>;
        if (this.state.glassTypes !== null) {
            glassOptions = this.state.glassTypes.map((glass) => {
                return <option key={glass.strGlass}>{glass.strGlass}</option>;
            });
        }
        let categoryOptions = <option>Unknown</option>;
        if (this.state.categories !== null) {
            categoryOptions = this.state.categories.map((glass) => {
                return (
                    <option key={glass.strCategory}>{glass.strCategory}</option>
                );
            });
        }
        let ingredientOptions = <option>Unknown</option>;
        if (this.state.ingredientOptions !== null) {
            ingredientOptions = this.state.ingredientOptions.map(
                (ingredient) => {
                    return (
                        <option key={ingredient.strIngredient1}>
                            {ingredient.strIngredient1}
                        </option>
                    );
                }
            );
        }

        return (
            <Aux>
                <form className={classes.IngredientSearch}>
                    <div className={classes.AddIngredients}>
                        <div className={classes.Dropdowns}>
                            <div>
                                <label className={classes.Title}>
                                    Ingredients
                                </label>
                                <select>{ingredientOptions}</select>
                            </div>
                            <Button
                                click={this.addIngredient}
                                className={classes.Button}
                                size="small"
                            >
                                Add
                            </Button>
                        </div>
                        <Ingredients
                            removeIngredient={this.removeIngredient}
                            ingredients={this.state.ingredients}
                        />
                    </div>

                    <div className={classes.Alcohol}>
                        <h2 className={classes.Title}>Alcohol?</h2>
                        <div
                            className={classes.CheckBox}
                            onClick={this.toggleAlcohol}
                        >
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
                    <div className={classes.Dropdowns}>
                        <div>
                            <label className={classes.Title}>Glass</label>
                            <select onChange={this.glassSelect}>
                                {glassOptions}
                            </select>
                        </div>
                        <div>
                            <label className={classes.Title}>Category</label>
                            <select onChange={this.categorySelect}>
                                {categoryOptions}
                            </select>
                        </div>
                    </div>
                    <Link to={this.props.match.url + "/drink"}>
                        <Button click={this.enterIngredientsHandler}>
                            what ya got?
                        </Button>
                    </Link>
                </form>
                <Divider className={classes.Divider} />
                <Route
                    path={
                        this.props.match.url + "/drinkcardlist/:param/:search"
                    }
                    component={DrinkCardList}
                />
            </Aux>
        );
    }
}

export default ingredientSearch;
