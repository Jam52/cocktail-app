import React from 'react';
import { shallow } from 'enzyme';
import Input from '../Input';

const wrapper = shallow(<Input placeholder="some text" />);

it('should mount', () => {
  expect(wrapper).toBeDefined();
});

it('renders without InputError class with no error in props', () => {
  wrapper.setProps({ error: true });
  expect(wrapper.find('div').prop('className')).toContain('InputError');
});

it('should have correct placeholder text', () => {
  expect(wrapper.find('input').props().placeholder).toEqual('some text');
  wrapper.setProps({ error: true, placeholder: 'error msg' });
  expect(wrapper.find('input').props().placeholder).toEqual('error msg');
});
