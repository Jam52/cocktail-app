import React, { Component } from 'react';
import NavItem from './NavItem/NavItem';
import classes from './NavList.module.scss';

class navList extends Component {
  render() {
    return (
      <nav className={classes.NavList}>
        <NavItem icon="search" />
        <NavItem icon="random" />
        <NavItem icon="popular" />
        <NavItem icon="about" />
      </nav>
    );
  }
}

export default navList;
