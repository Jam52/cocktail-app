import React, { Component } from "react";
import Button from "../../Button/Button";
import classes from "./NameSearch.module.scss";
import Input from "../../Input/Input";
import Aux from "../../../hoc/Auxillary/Auxillary";
import Divider from "../../Divider/Divider";
import DrinkCardList from "../../../components/DrinkCardList/DrinkCardList";
import { Route } from "react-router-dom";

class nameSearch extends Component {
    enterDrinkNameHandler = (event) => {
        event.preventDefault();
        const drinkName = event.target.previousSibling.lastChild.value;
        this.props.history.push({
            pathname:
                this.props.match.url +
                "/drinkcardlist/" +
                "search.php/" +
                "?s=" +
                drinkName,
        });
    };

    render() {
        console.log(this.props.match);
        return (
            <Aux>
                <form className={classes.DrinkSearch}>
                    <Input
                        label="Name your poison"
                        type="text"
                        placeholder="enter drink name"
                        name="drink name"
                    />

                    <Button click={this.enterDrinkNameHandler}>
                        What ya got?
                    </Button>
                </form>
                <Divider />
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

export default nameSearch;
