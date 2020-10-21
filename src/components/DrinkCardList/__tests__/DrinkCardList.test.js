import React from 'react';
import { shallow } from 'enzyme';
import { duplicateEntriesOnly } from '../DrinkCardList';
import data from './__mocks__/mockDrinkData.json';
import dataTwo from './__mocks__/mockDrinkDataTwo.json';
import DrinkCardList from '../DrinkCardList';
import { storeFactory, findByAttr } from '../../../testUtils/testUtils';
import axios from 'axios';
import moxios from 'moxios';

let store;

const setup = (initialState = {}, search = 'ingredientSearch') => {
  store = storeFactory(initialState);
  const wrapper = shallow(
    <DrinkCardList
      store={store}
      match={{ params: { search: 'ingredientSearch' } }}
    />,
  )
    .dive()
    .dive();

  return wrapper;
};

describe('DrinkCardList', () => {
  describe('for ingedientSearch route', () => {
    let wrapper;
    let state;
    beforeEach(() => {
      state = {
        ingredients: {
          selectedIngredients: ['Whiskey', 'Lime juice'],
        },
      };
      wrapper = setup(state);
    });
    test('should render w/ error', () => {
      expect(findByAttr(wrapper, 'component-drink-card-list').length).toBe(1);
    });

    test('should have access to selectedIngredients state', () => {
      expect(wrapper.instance().props.ingredients.selectedIngredients).toEqual(
        state.ingredients.selectedIngredients,
      );
    });

    test('sets searchParams in stateh', () => {
      expect(wrapper.state().searchParams).toBe('WhiskeyLime juice');
    });
  });
});
