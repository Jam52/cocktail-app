import React from 'react';
import DrinkCardTopper from '../../../assets/images/drinkCardTopper.png';
import classes from './DrinkCard.module.scss';
import { Link } from 'react-router-dom';

const drinkCard = (props) => {
  return (
    <Link to={'/drinkdetails/' + props.id} className={classes.DrinkCard}>
      <img src={DrinkCardTopper} alt=""></img>
      <h2>{props.title}</h2>
      <div className={classes.Container}>
        <div className={classes.Overlay}></div>
        <img src={props.src} alt={props.title} />
      </div>
    </Link>
  );
};

export default drinkCard;
