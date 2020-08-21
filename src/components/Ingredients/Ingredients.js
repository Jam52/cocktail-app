import React from "react";
import Ingredient from "./Ingredient/Ingredient";
import classes from "./Ingredients.module.scss";

const ingredients = (props) => {
    let ingredients = null;
    if (props.ingredients) {
        ingredients = props.ingredients.map((ing, index) => {
            return (
                <Ingredient clicked={props.removeIngredient} key={index}>
                    {ing}
                </Ingredient>
            );
        });
    }
    return <div className={classes.IngredientContainer}>{ingredients}</div>;
};

export default ingredients;
