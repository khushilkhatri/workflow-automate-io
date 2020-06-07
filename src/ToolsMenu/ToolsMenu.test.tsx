import React from 'react';
import { shallow } from 'enzyme';
import ToolsMenu from './ToolsMenu';

describe('<ToolsMenu />', () => {
  test('renders', () => {
    const wrapper = shallow(<ToolsMenu />);
    expect(wrapper).toMatchSnapshot();
  });
});
