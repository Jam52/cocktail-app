import React from 'react';
import { shallow } from 'enzyme';
import NavList from '../NavList/Navlist';
import NavItem from '../NavList/NavItem/NavItem';

describe('<NavList/>', () => {
  it('should render three navItems', () => {
    const wrapper = shallow(<NavList />);
    expect(wrapper.find(NavItem)).toHaveLength(3);
  });
});
