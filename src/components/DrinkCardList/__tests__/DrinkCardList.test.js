import React from 'react';
import { shallow } from 'enzyme';
import { duplicateEntriesOnly } from '../DrinkCardList';

import DrinkCardList from '../DrinkCardList';
import { findByAttr } from '../../../testUtils/testUtils';

const initialProps = {
  drinks: []
}
const setup = (props = initialProps) => {
  const wrapper = shallow(<DrinkCardList {...props}/>);
  return wrapper;
};

test('drinkCardList mounts without error', () => {
  const wrapper = setup();
  expect(findByAttr(wrapper, 'component-drink-card-list').length).toBe(1);
});
