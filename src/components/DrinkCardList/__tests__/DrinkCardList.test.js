import React from 'react';
import { shallow } from 'enzyme';
import { duplicateEntriesOnly } from '../DrinkCardList';

import DrinkCardList from '../DrinkCardList';
import { findByAttr } from '../../../testUtils/testUtils';

let store;

const setup = () => {
  const wrapper = shallow(<DrinkCardList />);
  return wrapper;
};

test('drinkCardList mounts without error', () => {
  const wrapper = setup();
  expect(findByAttr(wrapper, 'component-drink-card-list').length).toBe(1);
});
