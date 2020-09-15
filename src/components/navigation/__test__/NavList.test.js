import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavList from '../NavList/Navlist';
import NavItem from '../NavList/NavItem/NavItem';

configure({ adapter: new Adapter() });

describe('<NavList/>', () => {
  it('should render three navItems', () => {
    const wrapper = shallow(<NavList />);
    expect(wrapper.find(NavItem)).toHaveLength(3);
  });
});
