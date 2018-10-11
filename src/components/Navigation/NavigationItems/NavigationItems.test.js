import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import {NavLink} from 'react-router-dom';

configure({adapter: new Adapter()});

describe('<NavigationItems />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<NavigationItems />);
  });

  it('should render 2 <NavLink /> elements if not authenticated', () => {
    expect(wrapper.find(NavLink)).toHaveLength(2);
  });

  it('should render 3 <NavLink /> elements if authenticated', () => {
    wrapper.setProps({isAuth: true})
    expect(wrapper.find(NavLink)).toHaveLength(3);
  });

  it('should render Logout <NavLink /> elements if authenticated', () => {
    wrapper.setProps({isAuth: true})
    expect(wrapper.contains(<NavLink to="/logout">Logout</NavLink>)).toEqual(true);
  });
});