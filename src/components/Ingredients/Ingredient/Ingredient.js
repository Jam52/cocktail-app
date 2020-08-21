import React from "react";
import classes from "./Ingredient.module.scss";

const ingredient = (props) => {
    return (
        <div className={classes.IngredientContainer}>
            <button
                className={classes.Delete}
                onClick={props.clicked}
                value={props.children}
            >
                -
            </button>
            <p>{props.children}</p>
        </div>
    );
};

export default ingredient;
