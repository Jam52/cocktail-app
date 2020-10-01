import React from 'react';
import { Switch, Route } from 'react-router-dom';

import MainToolbar from '../MainToolbar/MainToolbar';
import MobileToolbar from '../MobileToolbar/MobileToolbar';
import Aux from '../../hoc/Auxillary/Auxillary';
import LandingPage from '../LandingPage/LandingPage';
import SearchPage from '../SearchPage/SearchPage.js';
import RandomPage from '../RandomPage/RandomPage';
import DrinkDetails from '../../components/DrinkDetails/DrinkDetails';
import AboutPage from '../AboutPage/AboutPage';

// import classes from "./Layout.Module.scss";

const Layout = (props) => {
  return (
    <Aux>
      <MainToolbar />
      <MobileToolbar />
      <Route path="/" exact component={LandingPage} />
      <Switch>
        <Route path="/search" component={SearchPage} />
        <Route path="/random" component={RandomPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/drinkdetails/:id" component={DrinkDetails} />
      </Switch>
    </Aux>
  );
};

export default Layout;
