import React, { Component } from "react";
import { Route, NavLink } from "react-router-dom";
import classes from "./SearchPage.module.scss";
import Divider from "../../components/Divider/Divider";
import NameSearch from "./NameSearch/NameSearch";
import IngredientSearch from "./IngredientSearch/IngredientSearch";
import DrinkCardList from "../DrinkCardList/DrinkCardList";

class SearchPage extends Component {
    render() {
        return (
            <div className={classes.Search}>
                <div className={classes.Container}>
                    <h2 className={classes.Title}>
                        Let me help you find what your looking for!
                    </h2>
                    <div>
                        <NavLink
                            className={classes.Link}
                            activeClassName={classes.active}
                            to={this.props.match.url + "/drink"}
                        >
                            Drink
                        </NavLink>
                        <NavLink
                            className={classes.Link}
                            activeClassName={classes.active}
                            to={this.props.match.url + "/ingredient"}
                        >
                            ingredients
                        </NavLink>
                    </div>
                </div>
                <Divider />
                <Route
                    path={this.props.match.url + "/drink"}
                    component={NameSearch}
                />
                <Route
                    path={this.props.match.url + "/ingredient"}
                    component={IngredientSearch}
                />
            </div>
        );
    }
}

export default SearchPage;
