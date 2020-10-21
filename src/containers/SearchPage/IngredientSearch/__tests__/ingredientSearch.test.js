import IngredientSearch, {
  UnconnectedIngredientSearch,
} from '../IngredientSearch';
import { shallow } from 'enzyme';
import React from 'react';
import { storeFactory } from '../../../../testUtils/testUtils';
import { findByAttr } from '../../../../testUtils/testUtils';
import { actionTypes } from '../../../../store/actions/index';

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
    test('adds new selected ingredient to state when dropdown option is selected', () => {
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
    describe('entering new ingredient into input', () => {
      let wrapper;
      beforeEach(() => {
        wrapper = setup(state);
        store.dispatch({
          type: actionTypes.SET_INGREDIENT_OPTIONS,
          payload: ['Vodka'],
        });
      });

      test('shows error if ingredient not in available ingredientOptions', () => {
        const button = findByAttr(wrapper, 'ingredients-submit');
        const input = findByAttr(wrapper, 'ingredients-input').at(0);
        input.simulate('change', { target: { value: 'Vodky' } });
        button.simulate('click', { preventDefault: () => {} });
        expect(
          findByAttr(wrapper, 'ingredients-input').at(0).props().placeholder,
        ).toEqual('we dont have that one!');
      });

      test('adds ingredient to state if correct', () => {
        const button = findByAttr(wrapper, 'ingredients-submit');
        const input = findByAttr(wrapper, 'ingredients-input').at(0);
        input.simulate('change', { target: { value: 'Vodka' } });
        button.simulate('click', { preventDefault: () => {} });
        expect(store.getState().ingredients.selectedIngredients).toEqual([
          'Vodka',
        ]);
      });
    });
  });
});
