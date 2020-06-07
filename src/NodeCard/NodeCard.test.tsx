import React from 'react';
import { shallow } from 'enzyme';
import NodeCard from './NodeCard';

describe('<NodeCard />', () => {
  test('renders', () => {
    const wrapper = shallow(<NodeCard />);
    expect(wrapper).toMatchSnapshot();
  });
});
