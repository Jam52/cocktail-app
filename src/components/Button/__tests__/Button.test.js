import React from 'react';
import { shallow } from 'enzyme';
import Button from '../Button';

const wrapper = shallow(<Button>Button Text</Button>);

it('should mount', () => {
  expect(wrapper).toBeDefined();
});

it('should contain correct text', () => {
  expect(wrapper.text()).toEqual('Button Text');
});
