import React, { Component } from "react";
import Button from "../Button/Button";
import { Route, Link } from "react-router-dom";
import Aux from "../../hoc/Auxillary/Auxillary";
import DrinkCardList from "../DrinkCardList/DrinkCardList";
import classes from "./RandomPage.module.scss";
import Divider from "../Divider/Divider";

class RandomPage extends Component {
    state = {
        count: 1,
    };

    randomDrinkHandler = (event) => {
        event.preventDefault();
        this.setState({ count: (this.state.count += 1) });
        this.props.history.push({
            pathname:
                this.props.match.url +
                "/drinkcardlist/" +
                "randomselection.php/" +
                "?s=" +
                this.state.count,
        });
    };

    render() {
        return (
            <Aux>
                <div className={classes.RandomPage}>
                    <h2 className={classes.Title}>
                        How about we have some fun?
                    </h2>
                    <div className={classes.ButtonContainer}>
                        <Button click={this.randomDrinkHandler}>
                            Random Selection
                        </Button>
                    </div>
                    <Divider />
                    <Route
                        path={
                            this.props.match.url +
                            "/drinkcardlist/:param/:search"
                        }
                        component={DrinkCardList}
                    />
                </div>
            </Aux>
        );
    }
}

export default RandomPage;
