import React from 'react';
import { shallow } from 'enzyme';
import PopularSearch from './PopularSearch/';
import { findByAttr } from '../../testUtils/testUtils.js';

jest.mock('../../services/cocktailDbApi.js');

describe('PopularSearch', () => {
  test('renders w/ error', () => {
    const wrapper = shallow(<PopularSearch />);
    expect(findByAttr(wrapper, 'component-popular-search').length).toBe(1);
  });

  test('fetches drink data on component did mount and sets it to component state', (done) => {
    const wrapper = shallow(<PopularSearch />);
    setTimeout(() => {
      wrapper.update();
      expect(wrapper.state().drinks.length).toBe(1);
      done();
    });
  });
});
