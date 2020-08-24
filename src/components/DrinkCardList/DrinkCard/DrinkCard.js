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
            <div className={classes.Container}>
                <div className={classes.Overlay}></div>
                <img src={props.src} />
            </div>
        </Link>
    );
};

export default drinkCard;
