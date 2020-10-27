import React from 'react';
import { mount } from 'enzyme';
import { storeFactory, findByAttr } from '../../../testUtils/testUtils';

import Ingredients from '../Ingredients';

let store;

const setup = (initialState = {}) => {
  store = storeFactory(initialState);
  const wrapper = mount(<Ingredients store={store} match={{ path: '' }} />);

  return wrapper;
};

describe('Ingredients', () => {
  describe('has no selected ingredients', () => {
    let wrapper;
    beforeEach(() => {
      const state = {
        ingredients: {
          selectedIngredients: [],
        },
      };
      wrapper = setup(state);
    });

    test('renders w/ error', () => {
      expect(findByAttr(wrapper, 'component-ingredients').length).toBe(1);
    });
    test('has no ingredients', () => {
      expect(findByAttr(wrapper, 'single-ingredient').length).toBe(0);
    });
  });

  describe('has some selected ingredients', () => {
    let wrapper;
    let state;
    beforeEach(() => {
      state = {
        ingredients: {
          selectedIngredients: ['Whiskey', 'Vodka'],
        },
      };
      wrapper = setup(state);
    });

    test('renders selected ingredients', () => {
      expect(findByAttr(wrapper, 'single-ingredient').length).toBe(
        state.ingredients.selectedIngredients.length,
      );
    });
    test('removes selectedIngredient from state on click of minus button', () => {
      wrapper.find({ value: 'Vodka' }).at(0).simulate('click');
      const expectedResult = ['Whiskey'];
      expect(store.getState().ingredients.selectedIngredients).toEqual(
        expectedResult,
      );
    });
  });
});
