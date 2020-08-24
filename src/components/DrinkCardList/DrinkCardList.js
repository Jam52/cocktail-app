import React, { Component } from "react";
import classes from "./DrinkCardList.module.scss";
import axios from "../../axiosCocktail";
import DrinkCard from "./DrinkCard/DrinkCard";
import Divider from "../../components/Divider/Divider";
import Aux from "../../hoc/Auxillary/Auxillary";
import Spinner from "../Spinner/Spinner";

class DrinkCardList extends Component {
    state = {
        searchItems: "",
        drinks: [],
        loading: true,
    };

    componentDidMount() {
        console.log("[DrinkCardList]ComponentDidMount");
        console.log(this.props.match.params.search);
        if (
            this.state.searchItems !==
            this.props.match.params.search + this.loadSearchParams()
        ) {
            this.fetchData();
        }
    }

    componentDidUpdate() {
        console.log("[DrinkCardList]ComponentDidUpdate");
        if (
            this.state.searchItems !==
            this.props.match.params.search + this.loadSearchParams()
        ) {
            this.fetchData();
        }
    }

    fetchData = async () => {
        console.log(this.props.match.params.param + this.loadSearchParams());
        let mainSearchParam = this.props.match.params.search.replace(" ", "_");
        console.log("{MainSearchParam}", mainSearchParam);

        let mainData = [];
        let data = ["inital"];

        if (mainSearchParam !== "?i=") {
            mainData = await axios
                .get(
                    "/v2/9973533/" +
                        this.props.match.params.param +
                        mainSearchParam
                )
                .then((response) => {
                    console.log("[MainData]", response.data.drinks);
                    if (response.data.drinks !== null) {
                        return [...response.data.drinks];
                    } else {
                        return [];
                    }
                });
            if (mainData.length > 0) {
                data = [...mainData];
            }

            if (typeof data[0] !== "object") {
                this.setState({
                    drinks: [],
                    searchItems:
                        this.props.match.params.search +
                        this.loadSearchParams(),
                    loading: false,
                });
                return null;
            }
        }

        for (let param of this.loadSearchParams()) {
            const fetchParam = await axios
                .get("/v2/9973533/filter.php/" + param)
                .then((response) => {
                    console.log(
                        `[ParamFetchData]${param}`,
                        response.data.drinks
                    );
                    return [...response.data.drinks];
                });

            if (data.length === 0) {
                break;
            }

            data = data.filter((obj) => typeof obj === "object");
            data.push(...fetchParam);

            if (data.length > fetchParam.length + 1) {
                data = this.duplicateEntries(data);
            }
        }

        console.log("{FINAL}", data);

        this.setState({
            drinks: data,
            searchItems:
                this.props.match.params.search + this.loadSearchParams(),
            loading: false,
        });
    };

    duplicateEntries(data) {
        return data
            .sort((a, b) => (a.strDrink > b.strDrink ? 1 : -1))
            .filter((drink, index) => {
                if (data[index + 1] !== undefined) {
                    return drink.strDrink === data[index + 1].strDrink;
                }
            });
    }

    fetchSearchParamsData = async (param) => {
        axios.get("/v2/9973533/filter.php/" + param).then((response) => {
            console.log(`[ParamFetchData]${param}`, response.data.drinks);

            return response.data.drinks;
        });
    };

    loadSearchParams() {
        const query = new URLSearchParams(this.props.location.search);
        let newSearchParams = [];
        for (let param of query.entries()) {
            if (param[1]) {
                newSearchParams.push(param.join("="));
                console.log(newSearchParams);
            }
        }
        return newSearchParams;
    }

    render() {
        let drinkCards = <Spinner />;

        if (this.state.loading === false) {
            if (
                this.state.drinks.length > 0 &&
                typeof this.state.drinks[0] === "object"
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
                    <p className={classes.Error}>
                        Sorry, I Can't Find Anything!
                    </p>
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

export default DrinkCardList;
