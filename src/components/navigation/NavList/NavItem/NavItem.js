import React from 'react';
import { NavLink } from 'react-router-dom';

import searchIcon from '../../../../assets/images/search_white.png';
import searchGold from '../../../../assets/images/search_gold.png';
import randomIcon from '../../../../assets/images/random_white.png';
import randomGold from '../../../../assets/images/random_gold.png';
import aboutIcon from '../../../../assets/images/about_white.png';
import aboutGold from '../../../../assets/images/about_gold.png';
import classes from './NavItem.module.scss';

const navItem = (props) => {
  let icon = '';
  let iconGold = '';
  let navigateTo = '';

  switch (props.icon) {
    case 'search':
      icon = searchIcon;
      iconGold = searchGold;
      navigateTo = '/search/';
      break;
    case 'random':
      icon = randomIcon;
      iconGold = randomGold;
      navigateTo = '/random';
      break;
    default:
      icon = aboutIcon;
      iconGold = aboutGold;
      navigateTo = '/about';
  }

  return (
    <NavLink
      to={navigateTo}
      className={classes.NavItem}
      onMouseOver={(e) => {
        e.currentTarget.firstElementChild.src = iconGold;
      }}
      onMouseOut={(e) => {
        e.currentTarget.firstElementChild.src = icon;
      }}
      activeClassName={classes.active}
    >
      <img className={classes.NavIcon} src={icon} alt={props.icon}></img>
      <p>{props.icon}</p>
    </NavLink>
  );
};

export default navItem;
