import React from 'react';
import { shallow } from 'enzyme';
import NodesPage from './NodesPage';

describe('<NodesPage />', () => {
  test('renders', () => {
    const wrapper = shallow(<NodesPage />);
    expect(wrapper).toMatchSnapshot();
  });
});
