import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import classes from './App.module.scss';
import Layout from './containers/Layout/Layout';
import MainToolbar from './containers/MainToolbar/MainToolbar';
import MobileToolbar from './containers/MobileToolbar/MobileToolbar';
import LandingPage from './containers/LandingPage/LandingPage';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { error: false };
  }

  render() {
    return (
      <BrowserRouter>
        <div className={classes.App}>
          <MainToolbar />
          <MobileToolbar />
          <Switch>
            <Route path="/" exact component={LandingPage} />
            <Route path="/" component={Layout} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
