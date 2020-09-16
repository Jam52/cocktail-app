import React from 'react';
import { shallow } from 'enzyme';
import { duplicateEntriesOnly } from '../duplicateEntriesOnly';
import data from './__mocks__/mockDrinkData.json';
import DrinkCardList from '../DrinkCardList';

it('should return 3 drinks', () => {
  expect(duplicateEntriesOnly(data.drinks).length).toEqual(3);
});

describe('<DrinkCardList/>', () => {
  const match = {
    params: {
      param: 'filter.php',
      search: '?i=vodka',
    },
  };

  const location = {
    search: '?a=alcoholic',
  };

  const wrapper = shallow(<DrinkCardList match={match} location={location} />);

  it('should mount', () => {
    expect(wrapper).toBeDefined();
  });
});