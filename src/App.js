import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import classes from './App.module.scss';
import Layout from './containers/Layout/Layout';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { error: false };
  }

  render() {
    return (
      <BrowserRouter>
        <div className={classes.App}>
          <Layout />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
