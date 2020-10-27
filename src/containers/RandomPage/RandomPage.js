import React, { Component } from 'react';
import classes from './RandomPage.module.scss';
import Divider from '../../components/Divider/Divider';
import Button from '../../components/Button/Button'
import DrinkCardList from '../../components/DrinkCardList/DrinkCardList';
import { connect } from 'react-redux'
import { addRandomDrinks } from '../../store/actions/index'

export class UnconnectedRandomPage extends Component {
  state = {
    loading: false,
    noDrinksFound: false
  };

  componentDidMount() {
    if(this.props.randomDrinks.drinks.length === 0) {
      this.setState({loading: true})
      this.props.addRandomDrinks();
    }
  }

  addMoreHandler () {
    console.log('clicked')
    this.props.addRandomDrinks()
  }

  
  render() {
    if(this.props.randomDrinks.drinks.length > 0 && this.state.loading === true) {
      this.setState({loading: false})
    }
    return (

        <div data-test="component-random-page" className={classes.RandomPage}>
          <DrinkCardList
            data-test="drink-card-list"
            loading={this.state.loading}
            drinks={this.props.randomDrinks.drinks}
            message=""
            noDrinksFound={this.state.noDrinksFound}
                />
        
          <div className={classes.Button} onClick={() => this.addMoreHandler()}>Add More</div>
         
        </div>
   
    );
  }
}

const mapStateToProps = (state) => {
  const { randomDrinks } = state;
  return {
    randomDrinks
  }
}

export default connect(mapStateToProps, { addRandomDrinks })(UnconnectedRandomPage);
