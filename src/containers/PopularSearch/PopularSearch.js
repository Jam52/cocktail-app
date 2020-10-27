import React, { Component } from 'react';
import DrinkCardList from '../../components/DrinkCardList/DrinkCardList';
import fetchCocktailDb from '../../services/cocktailDbApi'

class PopularSearch extends Component {
    state = {
        drinks: [],
        loading: false,
        noDrinksFound: false
    }

    componentDidMount = async () => {
        this.setState({loading: true})
        const drinkData = await this.fetchDrinkData()
        this.setState({drinks: drinkData, loading: false})
    }

    fetchDrinkData = async () => {
        let drinkData;
        try {
            drinkData = await fetchCocktailDb('popular.php')
        } catch (error) {
            this.setState({noDrinksFound: true})
            return []
        }
        return await drinkData
    }

    render() {
        return (
            <div data-test="component-popular-search">
                <DrinkCardList
                    data-test="drink-card-list"
                    loading={this.state.loading}
                    drinks={this.state.drinks}
                    message=""
                    noDrinksFound={this.state.noDrinksFound}
                />
            </div>
        )
    }
}

export default PopularSearch;