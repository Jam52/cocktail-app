import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

it('renders correctly', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.state('error')).toEqual(false);
});
