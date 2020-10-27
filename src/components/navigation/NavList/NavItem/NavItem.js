import React from 'react';
import { NavLink } from 'react-router-dom';

import searchIcon from '../../../../assets/images/search_white.png';
import randomIcon from '../../../../assets/images/random_white.png';
import aboutIcon from '../../../../assets/images/about_white.png';
import popularIcon from '../../../../assets/images/ppopular_white.png';
import classes from './NavItem.module.scss';

const navItem = (props) => {
  let icon = '';
  let navigateTo = '';

  switch (props.icon) {
    case 'search':
      icon = searchIcon;
      navigateTo = '/search/';
      break;
    case 'random':
      icon = randomIcon;
      navigateTo = '/random';
      break;
      case 'popular':
        icon = popularIcon;
        navigateTo = '/popular'
        break;
    default:
      icon = aboutIcon;
      navigateTo = '/about';
  }

  return (
    <NavLink
      to={navigateTo}
      className={classes.NavItem}
      activeClassName={classes.active}
    >
      <img className={classes.NavIcon} src={icon} alt={props.icon}></img>
      <p>{props.icon}</p>
    </NavLink>
  );
};

export default navItem;
