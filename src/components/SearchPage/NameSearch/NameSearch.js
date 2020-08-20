import React from "react";
import Button from "../../Button/Button";
import classes from "./NameSearch.module.scss";
import Input from "../../Input/Input";

const nameSearch = (props) => {
    return (
        <form className={classes.DrinkSearch}>
            <div className={classes.InputElement}>
                <Input
                    label="Name your poison"
                    type="text"
                    placeholder="enter drink name"
                    name="drink name"
                />
            </div>
            <Button>Suprise me!</Button>
        </form>
    );
};

export default nameSearch;
