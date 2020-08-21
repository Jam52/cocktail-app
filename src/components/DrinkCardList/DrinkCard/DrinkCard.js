import React from "react";
import DrinkCardTopper from "../../../assets/images/drinkCardTopper.png";
import classes from "./DrinkCard.module.scss";

const drinkCard = (props) => {
    return (
        <div className={classes.DrinkCard}>
            <img src={DrinkCardTopper}></img>
            <h2>{props.title}</h2>
            <img src={props.src} />
        </div>
    );
};

export default drinkCard;
