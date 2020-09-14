import React, { Component } from 'react';
import Button from '../../components/Button/Button';
import { Route } from 'react-router-dom';
import Aux from '../../hoc/Auxillary/Auxillary';
import DrinkCardList from '../../components/DrinkCardList/DrinkCardList';
import classes from './RandomPage.module.scss';
import Divider from '../../components/Divider/Divider';

class RandomPage extends Component {
  state = {
    count: 1,
    randomId: '',
  };

  randomDrinkSelectionHandler = (event) => {
    event.preventDefault();
    let newCount = this.state.count;
    this.setState({ count: (newCount += 1) });
    this.props.history.push({
      pathname:
        this.props.match.url +
        '/drinkcardlist/' +
        'randomselection.php/' +
        '?s=' +
        this.state.count,
    });
  };

  popularDrinkSelectionHandler = (event) => {
    event.preventDefault();
    let newCount = this.state.count;
    this.setState({ count: (newCount += 1) });
    this.props.history.push({
      pathname:
        this.props.match.url +
        '/drinkcardlist/' +
        'popular.php/' +
        '?s=' +
        this.state.count,
    });
  };

  latestDrinkSelectionHandler = (event) => {
    event.preventDefault();
    let newCount = this.state.count;
    this.setState({ count: (newCount += 1) });
    this.props.history.push({
      pathname:
        this.props.match.url +
        '/drinkcardlist/' +
        'latest.php/' +
        '?s=' +
        this.state.count,
    });
  };

  render() {
    return (
      <Aux>
        <div className={classes.RandomPage}>
          <h2 className={classes.Title}>How about we have some fun?</h2>
          <div className={classes.ButtonContainer}>
            <Button
              className={classes.Button}
              click={this.randomDrinkSelectionHandler}
            >
              Random Selection
            </Button>
            <Button
              className={classes.Button}
              click={this.popularDrinkSelectionHandler}
            >
              Popular Selection
            </Button>
            <Button
              className={classes.Button}
              click={this.latestDrinkSelectionHandler}
            >
              Latest Selection
            </Button>
          </div>
          <Divider />

          <Route
            path={this.props.match.url + '/drinkcardlist/:param/:search'}
            component={DrinkCardList}
          />
        </div>
      </Aux>
    );
  }
}

export default RandomPage;
