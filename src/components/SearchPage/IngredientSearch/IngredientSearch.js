import React from "react";
import Button from "../../Button/Button";
import Input from "../../Input/Input";
import classes from "./IngredientSearch.module.scss";

const ingredientSearch = () => {
    return (
        <div>
            <form className={classes.IngredientSearch}>
                <Input
                    label="Add Ingredient"
                    type="text"
                    placeholder="enter ingredient"
                    name="ingregient"
                    id="ingredient"
                    click={"#"}
                />
                <Button size="small">Add</Button>
                <div></div>
            </form>
        </div>
    );
};

export default ingredientSearch;
