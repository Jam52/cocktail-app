import React from "react";
import classes from "./Spinner.module.css";
import glassIcon from "../../assets/images/madame-mimi-logo-glass.png";
import Aux from "../../hoc/Auxillary/Auxillary";

const spinner = () => (
    <Aux>
        <div className={classes.Container}>
            <div className={classes.Loader}></div>
            <img
                src={glassIcon}
                className={classes.Icon}
                alt="Cocktail Glass Logo"
            ></img>
        </div>
    </Aux>
);

export default spinner;
