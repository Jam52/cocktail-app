import React from 'react';
import { shallow } from 'enzyme';
import DrinkDetails from '../DrinkDetails';

const match = {
  params: {
    id: 11002,
  },
};

const wrapper = shallow(<DrinkDetails match={match} />);

it('should mount', () => {
  expect(wrapper).toBeDefined();
});

// it('should have 5 ingredients', () => {
//   expect(wrapper.find('#ingredients').length).toEqual(5);
// });

it('should have loading header', () => {
  console.log(wrapper.find('h2'));
  expect(wrapper.find('h2').length).toEqual(1);
});
