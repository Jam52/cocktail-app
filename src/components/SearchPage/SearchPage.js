import React, { Component } from "react";
import { Route } from "react-router-dom";
import classes from "./SearchPage.module.scss";

class SearchPage extends Component {
    render() {
        return (
            <div className={classes.Search}>
                <form className={classes.DrinkSearch}>
                    <div className={classes.InputElement}>
                        <label>Name your poison </label>
                        <input
                            type="text"
                            placeholder="enter drink name"
                            name="drink name"
                        />
                    </div>
                    <button className={classes.Button}>Suprise me!</button>
                </form>
            </div>
        );
    }
}

export default SearchPage;
