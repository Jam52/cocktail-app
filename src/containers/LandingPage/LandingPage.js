import React from 'react';
import classes from './LandlingPage.module.scss';
import BackgroundImg from '../../assets/images/main-page-background.jpg';

const LandingPage = () => {
  return (
    <div
      className={classes.Main}
      style={{ backgroundImage: `url(${BackgroundImg})` }}
    >
      <div className={classes.Title}>
        <h1>
          “Welcome to Madame Mimi’s cocktail bar, what can I get for you?”
        </h1>
      </div>
    </div>
  );
};

export default LandingPage;
