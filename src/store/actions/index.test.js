import moxios from 'moxios';
import axios from '../../axiosCocktail';
import { storeFactory } from '../../testUtils/testUtils';
import { addRandomDrinks, getIngredientOptions } from '../actions/index';

describe('getIngredientOptions action creator', () => {
  beforeEach(() => {
    moxios.install(axios);
  });
  afterEach(() => {
    moxios.uninstall();
  });

 

  test('adds ingredients to state', () => {
    const ingredients = { drinks: [{ strIngredient1: 'Light rum' }] };
    const store = storeFactory();
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: ingredients,
      });
    });

    return store.dispatch(getIngredientOptions()).then(() => {
      const state = store.getState();
      expect(state.ingredients.ingredientOptions).toEqual(['Light rum']);
    });
  });

  test('adds random drinks to state', () => {
    const drinks = {drinks: [{name: 'a drink', ingredients: 'something'}]}
    const store = storeFactory();
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: drinks
      })
    })

    return store.dispatch(addRandomDrinks()).then(() => {
      const state = store.getState();
      expect(state.randomDrinks.drinks).toEqual([...drinks.drinks])
    })
  })
});
