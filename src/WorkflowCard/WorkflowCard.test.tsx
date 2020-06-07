import React from 'react';
import { shallow } from 'enzyme';
import WorkflowCard from './WorkflowCard';

describe('<WorkflowCard />', () => {
  test('renders', () => {
    const wrapper = shallow(<WorkflowCard />);
    expect(wrapper).toMatchSnapshot();
  });
});
