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
import PopularSearch from '../PopularSearch/PopularSearch';
import classes from'./Layout.module.scss';


const Layout = (props) => {
  return (
    <Aux>
      <MainToolbar />
      <MobileToolbar />
      <Route path="/" exact component={LandingPage} />
      <div className={classes.Layout}>
        <Switch>
          <Route path="/search" component={SearchPage} />
          <Route path="/random" component={RandomPage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/drinkdetails/:id" component={DrinkDetails} />
          <Route path="/popular" component={PopularSearch}/>
        </Switch>
      </div>
      
    </Aux>
  );
};

export default Layout;
