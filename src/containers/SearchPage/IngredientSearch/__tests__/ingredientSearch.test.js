const { checkEnteredIngredient } = require('../checkEnteredIngredient');
import list from './list.json';
import IngredientSearch, {
  UnconnectedIngredientSearch,
} from '../IngredientSearch';
import { shallow } from 'enzyme';
import React from 'react';
import { storeFactory } from '../../../../testUtils/testUtils';
import { findByAttr } from '../../../../testUtils/testUtils';
import Ingredients from '../../../../components/Ingredients/Ingredients';

let store;

const setup = (initialState = {}) => {
  store = storeFactory(initialState);
  const wrapper = shallow(
    <IngredientSearch store={store} match={{ path: '' }} />,
  )
    .dive()
    .dive();
  return wrapper;
};

describe('Ingredient Search', () => {
  describe('state has no selectedIngredients', () => {
    const state = {
      ingredients: {
        ingredientOptions: ['vodka', 'whiskey'],
        selectedIngredients: [],
      },
    };
    test('check if ingredient is in list', () => {
      expect(checkEnteredIngredient('vodka', list.drinks)).toBe('Vodka');
      expect(checkEnteredIngredient(' vodka', list.drinks)).toBe('Vodka');
      expect(checkEnteredIngredient('william', list.drinks)).toBeFalsy();
    });

    test('has access to ingredientOptions', () => {
      const wrapper = setup(state);
      expect(wrapper.instance().props.ingredients.ingredientOptions).toEqual(
        state.ingredients.ingredientOptions,
      );
    });

    test('has access to selectedIngredients', () => {
      const wrapper = setup(state);
      expect(wrapper.instance().props.ingredients.selectedIngredients).toEqual(
        state.ingredients.selectedIngredients,
      );
    });

    test('calls getIngredientOptions on mount', () => {
      const getIngredientOptionsMock = jest.fn();
      const wrapper = shallow(
        <UnconnectedIngredientSearch
          getIngredientOptions={getIngredientOptionsMock}
          match={{ path: '' }}
          ingredients={{ ingredientOptions: [] }}
        />,
      );
      const mockCalls = getIngredientOptionsMock.mock.calls.length;
      expect(mockCalls).toBe(1);
    });
    test('adds new selected ingredient to state', () => {
      const wrapper = setup(state);
      const mockPreventDefault = jest.fn();
      const dropdown = findByAttr(wrapper, 'dropdown-ingredients');
      const value = 'vodka';
      dropdown.simulate('change', {
        preventDefault: mockPreventDefault,
        target: { value: value },
      });

      expect(store.getState().ingredients.selectedIngredients).toEqual([value]);
    });
  });
});
