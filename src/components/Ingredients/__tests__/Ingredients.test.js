import React from 'react';
import { shallow } from 'enzyme';
import Ingredients from '../Ingredients';
import Ingredient from '../Ingredient/Ingredient';

const wrapper = shallow(
  <Ingredients ingredients={['vodka', 'rum', 'orange']} />,
);

it('should mount', () => {
  expect(wrapper).toBeDefined();
});

it('should have three <Ingredient/>', () => {
  expect(wrapper.find(Ingredient).length).toEqual(3);
});
