import moxios from 'moxios';
import axios from '../../axiosCocktail';
import { storeFactory } from '../../testUtils/testUtils';
import { getIngredientOptions } from '../actions/index';

describe('getIngredientOptions action creator', () => {
  beforeEach(() => {
    moxios.install(axios);
  });
  afterEach(() => {
    moxios.uninstall();
  });

  const ingredients = { drinks: [{ strIngredient1: 'Light rum' }] };

  test('adds ingredients to state', () => {
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
});
