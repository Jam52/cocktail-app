import React from "react";
import DrinkCardTopper from "../../../assets/images/drinkCardTopper.png";
import classes from "./DrinkCard.module.scss";
import { Link } from "react-router-dom";

const drinkCard = (props) => {
    console.log("[drinkCard]props:", props);
    return (
        <Link to={"/drinkdetails/" + props.id} className={classes.DrinkCard}>
            <img src={DrinkCardTopper}></img>
            <h2>{props.title}</h2>
            <img src={props.src} />
        </Link>
    );
};

export default drinkCard;
