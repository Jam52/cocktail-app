import IngredientSearch, {
  UnconnectedIngredientSearch,
} from '../IngredientSearch';
import { shallow } from 'enzyme';
import React from 'react';
import { storeFactory } from '../../../../testUtils/testUtils';
import { findByAttr } from '../../../../testUtils/testUtils';
import { addSelectedIngredient } from '../../../../store/actions/index';
import moxios from 'moxios';
import axios from '../../../../axiosCocktail'

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
  describe('state has no selectedIngredients, or ingredientOptions', () => {
    const state = {
      ingredients: {
        ingredientOptions: [],
        selectedIngredients: [],
        alcoholicDrinksOnly: true,
      },
    };

    test('access to ingredientOptions state', () => {
      const wrapper = setup(state);
      expect(wrapper.instance().props.ingredients.ingredientOptions).toEqual(
        state.ingredients.ingredientOptions,
      );
    });

    test('access to selectedIngredients state', () => {
      const wrapper = setup(state);
      expect(wrapper.instance().props.ingredients.selectedIngredients).toEqual(
        state.ingredients.selectedIngredients,
      );
    });

    test('if getIngredientOptions is called on mount', () => {
      const getIngredientOptionsMock = jest.fn();
      const wrapper = shallow(
        <UnconnectedIngredientSearch
          getIngredientOptions={getIngredientOptionsMock}
          match={{ path: '' }}
          ingredients={{ ...state.ingredients }}
        />,
      );
      const mockCalls = getIngredientOptionsMock.mock.calls.length;
      expect(mockCalls).toBe(1);
    });

    test('selecting alcohol check changes state', () => {
      const wrapper = setup(state);
      findByAttr(wrapper, 'toggle-alcohol').simulate('click');
      expect(store.getState().ingredients.alcoholicDrinksOnly).toBeFalsy();
    });

    describe('state has ingredientOptions but no selectedIngredients', () => {
      const state = {
        ingredients: {
          ingredientOptions: ['Whiskey', 'Vodka'],
          selectedIngredients: [],
          alcoholicDrinksOnly: true,
        },
      };
      test('that new selected ingredient is added to state when dropdown option is selected', () => {
        const wrapper = setup(state);
        const dropdown = findByAttr(wrapper, 'dropdown-ingredients');
        const expectedResults = ['Vodka'];
        dropdown.simulate('change', {
          preventDefault: () => {},
          target: { value: 'Vodka' },
        });

        expect(store.getState().ingredients.selectedIngredients).toEqual(
          expectedResults,
        );
      });

      test('if input shows error if ingredient is not in available ingredientOptions', () => {
        const wrapper = setup(state);
        const button = findByAttr(wrapper, 'ingredients-submit');
        const input = findByAttr(wrapper, 'ingredients-input').at(0);
        input.simulate('change', { target: { value: 'Vodky' } });
        button.simulate('click', { preventDefault: () => {} });
        expect(
          findByAttr(wrapper, 'ingredients-input').at(0).props().placeholder,
        ).toEqual('we dont have that one!');
      });

      test('if ingedient is added to selectedIngredient state if in ingredientOptions', () => {
        const wrapper = setup(state);
        const button = findByAttr(wrapper, 'ingredients-submit');
        const input = findByAttr(wrapper, 'ingredients-input').at(0);
        input.simulate('change', { target: { value: 'Vodka' } });
        button.simulate('click', { preventDefault: () => {} });
        expect(store.getState().ingredients.selectedIngredients).toEqual([
          'Vodka',
        ]);
      });
    })
  });
});

